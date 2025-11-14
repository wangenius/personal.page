"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface SelectionQuoteState {
  text: string;
  x: number;
  y: number;
  visible: boolean;
}

interface SelectionQuoteProps {
  children: ReactNode;
}

export function SelectionQuote({ children }: SelectionQuoteProps) {
  const [state, setState] = useState<SelectionQuoteState | null>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection) return;
      const text = selection.toString().trim();

      if (!text) {
        setState((prev) => (prev ? { ...prev, visible: false } : null));
        return;
      }

      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      if (!range) return;

      const rect = range.getBoundingClientRect();
      if (!rect || (rect.x === 0 && rect.y === 0 && rect.width === 0)) {
        return;
      }

      const x = rect.left + rect.width / 2;
      const y = rect.top - 8;

      setState({
        text,
        x,
        y,
        visible: true,
      });
    };

    document.addEventListener("mouseup", handleSelectionChange);
    document.addEventListener("keyup", handleSelectionChange);

    return () => {
      document.removeEventListener("mouseup", handleSelectionChange);
      document.removeEventListener("keyup", handleSelectionChange);
    };
  }, []);

  const handleQuote = () => {
    if (!state?.text) return;

    const path = typeof window !== "undefined" ? window.location.pathname : undefined;

    window.dispatchEvent(
      new CustomEvent("set-quote", {
        detail: { text: state.text, path },
      })
    );

    setState(null);
    const selection = window.getSelection();
    if (selection) selection.removeAllRanges();
  };

  return (
    <div className="relative">
      {children}
      {state?.visible && (
        <div
          className="fixed z-50 -translate-x-1/2 -translate-y-full rounded-full border bg-background px-3 py-1 text-xs shadow-md flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors"
          style={{
            left: state.x,
            top: state.y,
          }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleQuote}
        >
          <span>引用到对话</span>
        </div>
      )}
    </div>
  );
}
