# 认证系统设置指南

## 1. 环境变量配置

创建 `.env.local` 文件，添加以下环境变量：

```env
# 数据库连接 (Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# 应用 URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth 密钥 (使用以下命令生成)
# openssl rand -base64 32
BETTER_AUTH_SECRET="your-secret-key-here"

# OAuth 提供商 (可选)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# OpenAI (聊天功能)
OPENAI_API_KEY=""
```

## 2. 添加数据库脚本

在 `package.json` 的 `scripts` 中添加：

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

## 3. 初始化数据库

```bash
# 生成迁移文件
npm run db:generate

# 推送到数据库（开发环境）
npm run db:push

# 或者运行迁移（生产环境）
npm run db:migrate
```

## 4. 获取 Supabase 数据库 URL

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目或选择现有项目
3. 进入 Settings > Database
4. 复制 Connection String (URI format)
5. 将其设置为 `DATABASE_URL`

## 5. 配置 OAuth (可选)

### GitHub OAuth

1. 访问 https://github.com/settings/developers
2. 创建新的 OAuth App
3. 设置回调 URL: `http://localhost:3000/api/auth/callback/github`
4. 复制 Client ID 和 Client Secret

### Google OAuth

1. 访问 https://console.cloud.google.com
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 设置回调 URL: `http://localhost:3000/api/auth/callback/google`
6. 复制 Client ID 和 Client Secret

## 6. 运行应用

```bash
npm run dev
```

访问:
- 登录页面: http://localhost:3000/signin
- 注册页面: http://localhost:3000/signup

## 功能说明

### 已实现功能

✅ 邮箱密码注册和登录
✅ GitHub OAuth 登录（需配置）
✅ Google OAuth 登录（需配置）
✅ 用户会话管理
✅ 用户菜单（显示头像、邮箱）
✅ 退出登录
✅ 自动登录（记住会话）

### 页面路由

- `/signin` - 登录页面
- `/signup` - 注册页面
- `/api/auth/[...all]` - Better Auth API 路由

### 数据表结构

- `user` - 用户信息
- `session` - 会话管理
- `account` - OAuth 账户关联
- `verification` - 邮箱验证

## 故障排查

### 数据库连接失败

确保 `DATABASE_URL` 格式正确：
```
postgresql://username:password@host:port/database
```

### OAuth 登录失败

1. 检查 Client ID 和 Secret 是否正确
2. 确认回调 URL 配置正确
3. 查看浏览器控制台错误信息

### 会话问题

清除浏览器 Cookie 或使用无痕模式测试。

