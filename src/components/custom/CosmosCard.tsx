import { context } from "@/components/custom/ContextMenu";
import { dialog } from "@/components/custom/DialogModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "@/components/ui/menu";
import { lang } from "@/locales/i18n";
import { Tools } from "@/lib/tools";
import {
  openCosmos,
  exportCosmos,
  deleteCosmos,
} from "@/hook/cosmos/useCosmos";
import { CosmosMetaProps } from "@common/types/content";
import { motion } from "framer-motion";
import {
  TbCheck,
  TbCheckbox,
  TbDots,
  TbFileExport,
  TbPlanet,
  TbTrash,
} from "react-icons/tb";
import { toast } from "sonner";

interface CosmosCardProps {
  cosmos: CosmosMetaProps;
  selectedCosmoss: string[];
  onSelect?: () => void;
  onMultiSelect?: () => void;
}

export const CosmosCard = ({
  cosmos,
  selectedCosmoss,
  onSelect,
}: CosmosCardProps) => {
  const description =
    typeof cosmos.description === "string"
      ? cosmos.description
      : cosmos.description?.toText().trim() || lang("works.cosmos.noDesc");

  const isSelected = selectedCosmoss.includes(cosmos.id);
  const tags = cosmos.tags ?? [];

  const handleClick = async (e: React.MouseEvent) => {
    if (selectedCosmoss.length > 0) {
      e.stopPropagation();
      onSelect?.();
      return;
    }

    try {
      await openCosmos(cosmos.id);
    } catch (error) {
      toast.error("打开项目失败");
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-xl border ${
        isSelected ? "border-primary" : "border-muted-foreground/20"
      } bg-muted/40 p-4 flex flex-col gap-4 h-[170px] cursor-pointer group transition-all duration-200 hover:border-primary/40`}
      onContextMenu={(e) => {
        context({
          event: e,
          content: (close) => (
            <Menu
              items={[
                {
                  label: "选择",
                  onClick: () => {
                    e.stopPropagation();
                    onSelect?.();
                    close();
                  },
                  icon: TbCheckbox,
                },
                {
                  label: "导出项目",
                  onClick: async () => {
                    e.stopPropagation();
                    await exportCosmos(cosmos.id);
                    close();
                  },
                  icon: TbFileExport,
                },
                {
                  label: "删除项目",
                  onClick: () => {
                    e.stopPropagation();
                    dialog.confirm({
                      title: lang("works.cosmos.delete.title"),
                      content: `确定删除世界观【${cosmos.name}】吗？`,
                      onOk: async () => {
                        await deleteCosmos(cosmos.id);
                      },
                    });
                    close();
                  },
                  icon: TbTrash,
                },
              ]}
            />
          ),
        });
      }}
    >
      {/* 选中标记 */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
          <TbCheck className="h-4 w-4" />
        </div>
      )}

      {/* 头部区域：标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div className="text-base font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
          <Button
            className={`${isSelected ? "bg-primary/20 hover:bg-primary/30" : "bg-muted-foreground/10 hover:bg-muted-foreground/20"}`}
            variant="ghost"
            size="icon"
          >
            <TbPlanet
              className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
            />
          </Button>
          <span className="line-clamp-1">{cosmos.name}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity data-[state=open]:opacity-100 data-[state=open]:bg-muted-foreground/10"
            >
              <TbDots className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-28">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
            >
              <TbCheckbox className="h-4 w-4" />
              选择
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                await exportCosmos(cosmos.id);
              }}
            >
              <TbFileExport className="h-4 w-4" />
              导出项目
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                dialog.confirm({
                  title: lang("works.cosmos.delete.title"),
                  content: `确定删除世界观【${cosmos.name}】吗？`,
                  onOk: async () => {
                    await deleteCosmos(cosmos.id);
                  },
                });
              }}
              variant="destructive"
            >
              <TbTrash className="h-4 w-4" />
              {lang("works.cosmos.delete_action")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 描述文本 */}
      <div className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description || lang("works.cosmos.noDesc")}
        </p>
      </div>

      {/* 底部信息区域 */}
      <div className="flex items-center gap-1 text-xs flex-wrap">
        {/* 标签 */}
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag.label}
            className="px-2 py-0.5 rounded-full bg-primary/10 text-muted-foreground text-xs"
          >
            {tag.label}
          </span>
        ))}
        {tags.length > 2 && (
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-muted-foreground text-xs">
            +{tags.length - 2}
          </span>
        )}

        {/* 更新时间 */}
        <time className="text-xs text-muted-foreground ml-auto">
          {Tools.whenWasThat(cosmos.updated_at)}
        </time>
      </div>
    </motion.div>
  );
};
