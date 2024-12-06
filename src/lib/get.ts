import { DocItem } from "./navigations";

export function getFirstDocumentLink(item: DocItem | DocItem[]): string | undefined {
  // 如果输入是数组
  if (Array.isArray(item)) {
    if (!item.length) return undefined;
    
    for (const subItem of item) {
      const link = getFirstDocumentLink(subItem);
      if (link) return link;
    }
    return undefined;
  }

  // 如果当前项没有子项且有href，则返回其href
  if (!item.items && item.href) {
    return item.href;
  }

  // 如果当前项有子项，则递归查找
  if (item.items?.length) {
    return getFirstDocumentLink(item.items);
  }

  return undefined;
}