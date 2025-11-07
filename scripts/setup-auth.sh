#!/bin/bash

echo "🚀 Better Auth 设置向导"
echo "===================="
echo ""

# 检查 .env.local 是否存在
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local 已存在"
    read -p "是否覆盖？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 取消设置"
        exit 1
    fi
fi

# 创建 .env.local
cat > .env.local << 'EOF'
# Database (Supabase PostgreSQL)
DATABASE_URL=""

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=""

# OAuth Providers (Optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# OpenAI
OPENAI_API_KEY=""
EOF

echo "✅ 创建 .env.local 文件"

# 生成 Better Auth Secret
SECRET=$(openssl rand -base64 32)
sed -i.bak "s/BETTER_AUTH_SECRET=\"\"/BETTER_AUTH_SECRET=\"$SECRET\"/" .env.local
rm .env.local.bak
echo "✅ 生成 Better Auth Secret"

echo ""
echo "📝 请编辑 .env.local 文件并填入以下信息："
echo "   1. DATABASE_URL - Supabase 数据库连接字符串"
echo "   2. OPENAI_API_KEY - OpenAI API 密钥（聊天功能需要）"
echo "   3. OAuth 配置（可选）"
echo ""
echo "📚 详细说明请查看 AUTH_SETUP.md"
echo ""

# 询问是否立即打开编辑器
read -p "现在打开 .env.local 编辑？(Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    ${EDITOR:-nano} .env.local
fi

echo ""
echo "🎉 设置完成！"
echo ""
echo "下一步："
echo "  1. 运行 'npm run db:push' 初始化数据库"
echo "  2. 运行 'npm run dev' 启动开发服务器"

