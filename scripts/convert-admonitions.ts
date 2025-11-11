import fs from 'fs';
import path from 'path';

// 映射类型：:::type 到 <Callout type="type">
const typeMap: Record<string, string> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  tip: 'tip',
};

// 递归查找所有 MDX 文件
function findMdxFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 跳过 node_modules 和 .obsidian 目录
      if (file !== 'node_modules' && file !== '.obsidian') {
        findMdxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 转换单个文件
function convertFile(filePath: string): boolean {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // 匹配 :::type[title] 或 :::type 格式
  // 格式：:::type[title]\n内容\n:::
  // 使用更精确的匹配，确保能匹配到结束的 :::
  const admonitionPattern = /:::(\w+)(\[([^\]]*)\])?\n([\s\S]*?)\n:::/g;

  let match;
  let hasChanges = false;

  // 收集所有匹配项（从后往前处理，避免索引变化）
  const matches: Array<{
    start: number;
    end: number;
    type: string;
    title: string | undefined;
    body: string;
  }> = [];

  while ((match = admonitionPattern.exec(content)) !== null) {
    const type = match[1];
    const title = match[3]; // match[3] 是标题（不包含方括号）
    const body = match[4] || '';
    
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      type,
      title: title || undefined,
      body: body.trim(),
    });
  }

  // 从后往前替换，避免索引变化
  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    const calloutType = typeMap[m.type] || m.type;
    const titleAttr = m.title ? ` title="${m.title}"` : '';
    
    const replacement = m.body
      ? `<Callout type="${calloutType}"${titleAttr}>\n${m.body}\n</Callout>`
      : `<Callout type="${calloutType}"${titleAttr}>\n</Callout>`;
    
    content = content.substring(0, m.start) + replacement + content.substring(m.end);
    hasChanges = true;
  }

  if (hasChanges && content !== originalContent) {
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

  let convertedCount = 0;
  
  for (const file of files) {
    try {
      if (convertFile(file)) {
        console.log(`✓ 已转换: ${path.relative(process.cwd(), file)}`);
        convertedCount++;
      }
    } catch (error) {
      console.error(`✗ 转换失败: ${file}`, error);
    }
  }
  
  console.log(`\n转换完成！共转换 ${convertedCount} 个文件`);
}

// 运行转换
main();
