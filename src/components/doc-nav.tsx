'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocNode, generateDocTree } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface DocNavProps {
  className?: string;
}

export function DocNav({ className }: DocNavProps) {
  const [docTree, setDocTree] = useState<DocNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const loadDocTree = async () => {
    try {
      setError(null);
      const tree = await generateDocTree();
      setDocTree(tree);
    } catch (error) {
      setError('加载文档树失败');
      console.error('加载文档树失败:', error);
    }
  };

  useEffect(() => {
    loadDocTree();
  }, []);

  const renderNode = (node: DocNode) => {
    const isActive = pathname === node.path;

    if (!node.isDirectory) {
      return (
        <Link
          key={node.path}
          href={node.path}
          className={cn(
            'block px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800',
            isActive && 'bg-gray-100 dark:bg-gray-800 font-medium'
          )}
        >
          {node.name}
        </Link>
      );
    }

    return (
      <div key={node.path} className="space-y-1">
        <div className="font-medium text-sm px-2 py-1">{node.name}</div>
        {node.children && node.children.length > 0 && (
          <div className="pl-4 space-y-1">
            {node.children.map((child: DocNode) => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>{error}</p>
        <button
          onClick={loadDocTree}
          className="mt-2 text-sm text-blue-500 hover:underline"
        >
          重试
        </button>
      </div>
    );
  }

  if (!docTree) {
    return <div className="p-4">加载中...</div>;
  }

  return (
    <nav className={cn('w-64 p-4 space-y-2', className)}>
      {docTree.children?.map((node: DocNode) => renderNode(node))}
    </nav>
  );
} 