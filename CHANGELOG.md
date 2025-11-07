# 更新日志

## 2025-11-07 - 首页重构 & 认证系统集成

### 🎨 首页优化

#### 新增组件
- ✅ **个人信息展示** (`src/components/personal-profile.tsx`)
  - Bento.me 风格的简洁卡片设计
  - 个人简介、标签展示
  - 社交媒体链接（GitHub、Twitter、LinkedIn 等）
  - 项目作品展示（Ghostie、Jezzlab 等）

- ✅ **聊天侧边栏** (`src/components/chat-sidebar.tsx`)
  - 右侧滑入式设计
  - Framer Motion 流畅动画
  - 点击 Header "对话"按钮展开/收起
  - 响应式布局

- ✅ **用户菜单** (`src/components/user-menu.tsx`)
  - 显示用户头像和信息
  - 登录状态管理
  - 下拉菜单（个人资料、设置、退出）

#### 页面更新
- ✅ Header 右侧添加极简按钮（对话、登录/用户菜单）
- ✅ 首页改为个人信息展示，聊天功能移至侧边栏
- ✅ GitHub 链接移至个人信息区域

### 🔐 认证系统

#### 技术栈
- **Better Auth** - 现代化认证库
- **Drizzle ORM** - 类型安全的 ORM
- **Supabase PostgreSQL** - 数据库

#### 功能实现
- ✅ 邮箱密码注册和登录
- ✅ OAuth 登录支持（GitHub、Google）
- ✅ 会话管理（7天有效期）
- ✅ 用户头像和信息显示
- ✅ 自动登录
- ✅ 安全退出

#### 新增文件

**数据库配置**
- `src/lib/db/schema.ts` - 数据表定义
- `src/lib/db/index.ts` - 数据库连接
- `drizzle.config.ts` - Drizzle 配置

**认证配置**
- `src/lib/auth.ts` - Better Auth 服务端配置
- `src/lib/auth-client.ts` - Better Auth 客户端钩子
- `src/app/api/auth/[...all]/route.ts` - API 路由

**页面**
- `src/app/(auth)/signin/page.tsx` - 登录页面
- `src/app/(auth)/signup/page.tsx` - 注册页面
- `src/app/(auth)/layout.tsx` - 认证页面布局

**UI 组件**
- `src/components/ui/card.tsx` - 卡片组件

**文档**
- `AUTH_SETUP.md` - 详细设置指南
- `scripts/setup-auth.sh` - 快速设置脚本

### 📦 新增依赖

```json
{
  "better-auth": "^1.3.34",
  "drizzle-orm": "^0.44.7",
  "drizzle-kit": "^0.31.6",
  "@neondatabase/serverless": "^1.0.2"
}
```

### 🚀 快速开始

#### 1. 设置环境变量

运行设置脚本：
```bash
./scripts/setup-auth.sh
```

或手动创建 `.env.local`：
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-key"
```

#### 2. 添加数据库脚本到 package.json

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

#### 3. 初始化数据库

```bash
npm run db:push
```

#### 4. 启动开发服务器

```bash
npm run dev
```

### 📝 页面路由

- `/` - 个人信息首页
- `/signin` - 登录
- `/signup` - 注册
- `/api/auth/[...all]` - 认证 API

### 🎯 设计特点

- **极简风格**：按钮只显示图标，无文字
- **流畅动画**：使用 Framer Motion
- **响应式设计**：适配移动端和桌面端
- **类型安全**：完整的 TypeScript 支持
- **现代化**：使用最新的 Next.js 15、Tailwind v4

### 📚 更多信息

详细配置说明请查看 `AUTH_SETUP.md`

