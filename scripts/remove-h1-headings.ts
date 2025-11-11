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

// 删除一级标题
function removeH1Headings(filePath: string): boolean {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // 检查是否有 frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    // 没有 frontmatter，跳过
    return false;
  }

  // 获取 frontmatter 之后的内容
  const frontmatterEnd = frontmatterMatch[0].length;
  let body = content.substring(frontmatterEnd);
  const frontmatter = content.substring(0, frontmatterEnd);
  
  // 按行处理，但要考虑代码块
  const lines = body.split('\n');
  const newLines: string[] = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 检测代码块开始和结束
    const codeBlockStart = line.match(/^```(\w+)?/);
    if (codeBlockStart) {
      inCodeBlock = true;
      codeBlockLang = codeBlockStart[1] || '';
      newLines.push(line);
      continue;
    }
    
    if (line.trim() === '```') {
      inCodeBlock = false;
      codeBlockLang = '';
      newLines.push(line);
      continue;
    }
    
    // 如果在代码块中，直接保留
    if (inCodeBlock) {
      newLines.push(line);
      continue;
    }
    
    // 检查是否是一级标题
    // 一级标题格式：^# [^#]  (以 # 开头，后面是空格，然后不是 #)
    // 只要是在代码块外的一级标题，都应该删除（因为已经有 frontmatter 的 title 了）
    // 更宽松的策略：只要匹配一级标题格式，就删除（除非下一行是代码块开始，那可能是误判）
    const h1Match = line.match(/^#\s+(.+)$/);
    if (h1Match) {
      // 检查下一行是否是代码块开始（避免误删代码中的注释）
      const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
      const nextLineTrim = nextLine.trim();
      
      // 如果下一行是代码块开始，可能是误判，保留这一行
      // 但大多数情况下，一级标题后面不会是代码块，所以可以安全删除
      // 为了更安全，我们检查：如果下一行是代码块开始，且当前行看起来不像标题（比如包含特殊字符），则保留
      if (nextLineTrim.startsWith('```')) {
        // 如果标题内容看起来像是代码注释（比如包含括号、等号等），可能是误判，保留
        const titleContent = h1Match[1];
        if (titleContent.includes('(') || titleContent.includes('=') || titleContent.includes('{')) {
          newLines.push(line);
          continue;
        }
      }
      
      // 其他情况，一律删除一级标题
      modified = true;
      continue;
    }
    
    newLines.push(line);
  }
  
  if (modified) {
    body = newLines.join('\n');
    // 清理连续的空行（最多保留两个空行）
    body = body.replace(/\n{3,}/g, '\n\n');
    content = frontmatter + body;
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

  let processedCount = 0;
  
  for (const file of files) {
    try {
      if (removeH1Headings(file)) {
        console.log(`✓ 已处理: ${path.relative(process.cwd(), file)}`);
        processedCount++;
      }
    } catch (error) {
      console.error(`✗ 处理失败: ${file}`, error);
    }
  }
  
  console.log(`\n处理完成！共处理 ${processedCount} 个文件`);
}

// 运行
main();

