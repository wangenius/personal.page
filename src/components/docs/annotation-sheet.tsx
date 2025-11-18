"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { dialog } from "@/components/custom/DialogModal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export type AnnotationTarget = {
  text: string;
  path: string;
};

type CommentDto = {
  id: string;
  noteId: string;
  body: string;
  parentCommentId: string | null;
  userId: string;
  userName: string | null;
  userEmail: string | null;
  createdAt: string;
  updatedAt: string;
};

type NoteDto = {
  id: string;
  path: string;
  selection: string;
  selectorRegex: string | null;
  userId: string;
  userName: string | null;
  userEmail: string | null;
  createdAt: string;
  updatedAt: string;
  comments: CommentDto[];
};

const getDisplayName = (name: string | null, email: string | null) =>
  name ?? email ?? "匿名用户";

function AnnotationDialogContent({
  target,
  close,
}: {
  target: AnnotationTarget;
  close: () => void;
}) {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<NoteDto[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [replyTarget, setReplyTarget] = useState<{
    noteId: string;
    commentId: string;
  } | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [replyError, setReplyError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const loadNotes = useCallback(async () => {
    if (!target?.path) return;
    setIsFetching(true);
    setFetchError(null);
    try {
      const response = await fetch(
        `/api/annotations/notes?path=${encodeURIComponent(target.path)}`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error ?? "无法加载批注");
      }
      const data = await response.json();
      setNotes(Array.isArray(data?.notes) ? data.notes : []);
    } catch (error) {
      setFetchError(
        error instanceof Error ? error.message : "读取批注时发生错误"
      );
    } finally {
      setIsFetching(false);
    }
  }, [target?.path]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleCreateNote = useCallback(async () => {
    if (!target || !body.trim()) return;
    if (!session?.user) {
      setActionError("请先登录以保存批注。");
      return;
    }
    setSubmitting(true);
    setActionError(null);
    try {
      const response = await fetch("/api/annotations/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: target.path,
          selectionText: target.text,
          body: body.trim(),
        }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error ?? "无法保存批注");
      }
      setBody("");
      await loadNotes();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "保存批注失败");
    } finally {
      setSubmitting(false);
    }
  }, [body, loadNotes, session?.user, target]);

  const handleToggleReply = useCallback(
    (noteId: string, commentId: string) => {
      if (!session?.user) {
        setReplyError("请先登录以回复批注。");
        return;
      }
      setReplyError(null);
      if (
        replyTarget?.noteId === noteId &&
        replyTarget?.commentId === commentId
      ) {
        setReplyTarget(null);
        setReplyBody("");
        return;
      }
      setReplyTarget({ noteId, commentId });
      setReplyBody("");
    },
    [replyTarget, session?.user]
  );

  const handlePostReply = useCallback(async () => {
    if (!replyTarget || !replyBody.trim() || !session?.user) return;
    setReplySubmitting(true);
    setReplyError(null);
    try {
      const response = await fetch("/api/annotations/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId: replyTarget.noteId,
          parentCommentId: replyTarget.commentId,
          body: replyBody.trim(),
        }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error ?? "无法发送回复");
      }
      setReplyBody("");
      setReplyTarget(null);
      await loadNotes();
    } catch (error) {
      setReplyError(error instanceof Error ? error.message : "发送回复失败");
    } finally {
      setReplySubmitting(false);
    }
  }, [loadNotes, replyBody, replyTarget, session?.user]);

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      if (!session?.user) return;
      setDeletingCommentId(commentId);
      try {
        const response = await fetch("/api/annotations/comments", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentId }),
        });
        if (!response.ok) {
          const error = await response.json().catch(() => null);
          throw new Error(error?.error ?? "无法删除批注");
        }
        await loadNotes();
      } catch (error) {
        console.error(error);
      } finally {
        setDeletingCommentId(null);
      }
    },
    [loadNotes, session?.user]
  );

  function renderComment(
    commentItem: CommentDto,
    repliesByParent: Record<string, CommentDto[]>,
    noteId: string,
    depth: number
  ) {
    const isReplying =
      replyTarget?.noteId === noteId &&
      replyTarget?.commentId === commentItem.id;

    return (
      <div
        key={`comment-${commentItem.id}`}
        className="space-y-2 rounded-md border border-border/70 bg-muted-foreground/10 p-3"
      >
        <div className="flex justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm leading-relaxed text-foreground">
              {commentItem.body}
            </p>
            <p className="text-xs text-muted-foreground">
              {getDisplayName(commentItem.userName, commentItem.userEmail)} ·{" "}
              {new Date(commentItem.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggleReply(noteId, commentItem.id)}
              disabled={!session?.user}
            >
              {isReplying ? "取消" : "回复"}
            </Button>
            {session?.user?.id === commentItem.userId && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive-foreground"
                onClick={() => handleDeleteComment(commentItem.id)}
                disabled={deletingCommentId === commentItem.id}
              >
                {deletingCommentId === commentItem.id ? "删除中…" : "删除"}
              </Button>
            )}
          </div>
        </div>
        {isReplying && (
          <div className="space-y-2 rounded-md border border-dashed border-border px-2 py-2">
            <Textarea
              placeholder="写下你的回复"
              value={replyBody}
              onChange={(event) => setReplyBody(event.target.value)}
              disabled={!session?.user || replySubmitting}
            />
            <div className="flex items-center justify-between gap-2">
              <Button
                size="sm"
                onClick={handlePostReply}
                disabled={
                  !session?.user || replySubmitting || !replyBody.trim()
                }
              >
                {replySubmitting ? "提交中…" : "提交回复"}
              </Button>
              {replyError && (
                <p className="text-xs text-destructive-foreground">
                  {replyError}
                </p>
              )}
            </div>
          </div>
        )}
        {renderReplies(repliesByParent, noteId, depth + 1, commentItem.id)}
      </div>
    );
  }

  function renderReplies(
    repliesByParent: Record<string, CommentDto[]>,
    noteId: string,
    depth: number,
    parentId: string
  ) {
    const children = repliesByParent[parentId];
    if (!children?.length) return null;
    return children.map((reply) => (
      <div
        key={reply.id}
        className="space-y-2"
        style={{ marginLeft: depth * 16 }}
      >
        {renderComment(reply, repliesByParent, noteId, depth)}
      </div>
    ));
  }

  const targetSelection = target?.text ?? "尚未选中文本";

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="space-y-2 rounded-lg border border-border bg-muted/40 px-3 py-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          已选文本
        </p>
        <p className="text-sm font-medium text-foreground">{targetSelection}</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            添加批注
          </p>
          <p className="text-xs text-muted-foreground">
            {session?.user ? "所有人可见" : "请先登录"}
          </p>
        </div>
        <Textarea
          placeholder="写下你的理解或补充"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          disabled={!session?.user || submitting}
        />
        <div className="flex items-center justify-between gap-2">
          {actionError ? (
            <p className="text-xs text-destructive-foreground">{actionError}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              批注会和选中的段落进行模糊匹配
            </p>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={close}
              className="text-muted-foreground"
            >
              关闭
            </Button>
            <Button
              size="sm"
              onClick={handleCreateNote}
              disabled={!session?.user || submitting || !body.trim()}
            >
              {submitting ? "保存中…" : "保存批注"}
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-1 flex-col gap-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            当前批注
          </p>
          <p className="text-xs text-muted-foreground">
            {isFetching ? "加载中…" : `${notes.length} 条记录`}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          {isFetching ? (
            <p className="text-xs text-muted-foreground">正在加载已有批注…</p>
          ) : fetchError ? (
            <p className="text-xs text-destructive-foreground">{fetchError}</p>
          ) : notes.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              暂无批注，快来第一个补充吧。
            </p>
          ) : (
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-2">
                {notes.map((noteItem) => {
                  const repliesByParent = noteItem.comments.reduce<
                    Record<string, CommentDto[]>
                  >((acc, commentItem) => {
                    if (!commentItem.parentCommentId) return acc;
                    const list = acc[commentItem.parentCommentId] ?? [];
                    return {
                      ...acc,
                      [commentItem.parentCommentId]: [...list, commentItem],
                    };
                  }, {});

                  const rootComments = noteItem.comments.filter(
                    (commentItem) => !commentItem.parentCommentId
                  );

                  return (
                    <div
                      key={`note-${noteItem.id}`}
                      className="space-y-3 rounded-2xl border border-border/70 bg-background/90 px-3 py-3 shadow-sm"
                    >
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          选区
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {noteItem.selection}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getDisplayName(
                            noteItem.userName,
                            noteItem.userEmail
                          )}{" "}
                          · {new Date(noteItem.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {rootComments.length === 0 ? (
                          <p className="text-xs text-muted-foreground">
                            还没有评论。
                          </p>
                        ) : (
                          rootComments.map((root) => (
                            <div key={root.id}>
                              {renderComment(
                                root,
                                repliesByParent,
                                noteItem.id,
                                0
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        批注匹配使用正则：默认匹配所选文本的第一个出现位置。
      </p>
    </div>
  );
}

export function openAnnotationDialog(target: AnnotationTarget) {
  return dialog({
    title: "添加批注",
    description: "追加一条独立于对话的记录，会并列展示同路径所有批注。",
    className: "max-w-5xl w-[92vw]",
    content: (close) => (
      <AnnotationDialogContent target={target} close={close} />
    ),
  });
}
