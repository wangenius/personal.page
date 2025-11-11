import fs from 'fs';
import path from 'path';

// 递归查找所有 MDX 文件
function findMdxFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.obsidian') {
        findMdxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 清理文件中的残留 ::: 标记
function cleanFile(filePath: string): boolean {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  let modified = false;

  // 1. 清理单独的 ::: 行（前后可能有空格）
  content = content.replace(/^\s*:::\s*$/gm, (match) => {
    modified = true;
    return '';
  });

  // 2. 清理 </Callout> 后面紧跟着的类型和标题（错误格式）
  // 例如: </Callout>success[标题] -> </Callout>
  content = content.replace(/<\/Callout>(\w+)\[([^\]]+)\]/g, (match, type, title) => {
    modified = true;
    // 这应该被分成两个 Callout，但为了安全，先删除错误的附加部分
    return `</Callout>\n\n<Callout type="${type}" title="${title}">`;
  });

  // 3. 清理行内残留的 :::（前后有空格的情况）
  content = content.replace(/\s+:::\s+/g, (match) => {
    modified = true;
    return ' ';
  });

  // 4. 清理 Callout 标签内的 ::: 残留
  content = content.replace(/<Callout[^>]*>([\s\S]*?)\s*:::\s*([\s\S]*?)<\/Callout>/g, (match, before, after) => {
    modified = true;
    return `<Callout${match.match(/<Callout([^>]*)>/)?.[1] || ''}>${before}${after}</Callout>`;
  });

  if (modified && content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }

  return false;
}

// 主函数
function main() {
  const contentDir = path.join(process.cwd(), 'content');
  
  if (!fs.existsSync(contentDir)) {
    console.error('content 目录不存在！');
    process.exit(1);
  }

  console.log('正在查找 MDX 文件...');
  const files = findMdxFiles(contentDir);
  console.log(`找到 ${files.length} 个 MDX 文件\n`);

  let cleanedCount = 0;
  
  for (const file of files) {
    try {
      if (cleanFile(file)) {
        console.log(`✓ 已清理: ${path.relative(process.cwd(), file)}`);
        cleanedCount++;
      }
    } catch (error) {
      console.error(`✗ 清理失败: ${file}`, error);
    }
  }
  
  console.log(`\n清理完成！共清理 ${cleanedCount} 个文件`);
}

// 运行清理
main();
