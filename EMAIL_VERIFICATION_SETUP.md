# 邮件验证配置指南

## 📧 功能说明

现在注册新用户时需要通过邮件验证才能登录。流程如下：

1. ✅ 用户在注册页面填写信息
2. ✅ 系统创建账户并发送验证邮件
3. ✅ 用户点击邮件中的验证链接
4. ✅ 验证成功后可以登录

## 🔧 配置步骤

### 1. 注册 Resend 账号

Resend 是一个简单易用的邮件发送服务。

1. 访问 [Resend.com](https://resend.com)
2. 注册账号（免费版本每月 3,000 封邮件）
3. 进入 Dashboard > API Keys
4. 创建新的 API Key

### 2. 配置环境变量

在 `.env` 或 `.env.local` 文件中添加：

```env
# Resend API Key (必需)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# 发件人邮箱 (可选，默认使用 onboarding@resend.dev)
EMAIL_FROM="noreply@yourdomain.com"

# 其他必需的环境变量
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key"
```

### 3. 配置发件域名（生产环境）

**开发环境**：
- 可以直接使用 `onboarding@resend.dev` 作为发件人
- 不需要额外配置

**生产环境**：
1. 在 Resend Dashboard 添加你的域名
2. 添加 DNS 记录（SPF, DKIM, DMARC）
3. 等待验证通过（通常几分钟）
4. 设置 `EMAIL_FROM="noreply@yourdomain.com"`

详细步骤：https://resend.com/docs/dashboard/domains/introduction

## 📝 邮件模板

系统已配置了两个邮件模板：

### 1. 邮箱验证邮件

```
主题: 验证你的邮箱
内容:
- 欢迎消息
- 验证按钮
- 验证链接（可复制）
- 有效期提示（24小时）
```

### 2. 密码重置邮件

```
主题: 重置密码
内容:
- 重置请求确认
- 重置密码按钮
- 有效期提示（1小时）
```

## 🧪 测试邮件功能

### 开发环境测试

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问注册页面：`http://localhost:3000/signup`

3. 填写注册信息：
   - 用户名：测试用户
   - 邮箱：your-email@example.com
   - 密码：至少8位

4. 提交注册：
   - 如果配置了 `RESEND_API_KEY`：邮件会发送到你的邮箱
   - 如果未配置：验证链接会打印在控制台

5. 查看邮件：
   - 打开邮箱
   - 点击验证链接
   - 应该跳转到验证成功页面

6. 测试登录：
   - 验证前尝试登录 → 显示"请先验证邮箱"
   - 验证后登录 → 成功登录

### 无 RESEND_API_KEY 的测试方法

如果没有配置 Resend，系统会在控制台输出验证链接：

```bash
⚠️ RESEND_API_KEY 未配置，跳过邮件发送
📧 验证链接: http://localhost:3000/verify-email?token=xxxxx
```

直接复制这个链接在浏览器打开即可完成验证。

## 📱 用户流程

### 注册流程

```
注册页面 → 填写信息 → 提交
    ↓
创建账户 → 发送验证邮件
    ↓
显示提示页面：
  ✅ 账户创建成功
  📨 请查收验证邮件
  💡 使用提示
    ↓
用户打开邮箱 → 点击验证链接
    ↓
验证页面 → 验证成功
    ↓
自动跳转登录页面
```

### 登录流程

```
未验证用户登录：
  ↓
显示错误提示：
  ⚠️ 请先验证你的邮箱
  我们已发送验证邮件到你的邮箱
    ↓
用户查看邮件完成验证
    ↓
再次登录 → 成功
```

## 🎨 页面说明

### `/signup` - 注册页面
- 注册表单（用户名、邮箱、密码）
- 密码确认
- GitHub 社交登录（可选）
- **注册成功后显示邮件验证提示**

### `/verify-email` - 邮件验证页面
- 自动处理验证 token
- 显示验证状态（进行中/成功/失败）
- 验证成功后自动跳转登录页
- 验证失败显示错误信息和帮助

### `/signin` - 登录页面
- 登录表单
- **未验证用户会看到友好提示**
- 社交登录（可选）

## 🔐 安全特性

### 验证链接
- ✅ 使用加密 token
- ✅ 24 小时过期
- ✅ 一次性使用（验证后失效）
- ✅ 防止重放攻击

### 邮件安全
- ✅ 不在邮件中包含密码
- ✅ 使用 HTTPS 验证链接
- ✅ 包含用户名但不包含敏感信息

### 登录保护
- ✅ 未验证邮箱无法登录
- ✅ 友好的错误提示
- ✅ 防止暴力破解

## ⚙️ Better Auth 配置

当前配置在 `src/lib/auth.ts`：

```typescript
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // 需要邮件验证
    requireEmailVerification: true, // 强制验证
    sendResetPassword: async ({ user, url }) => {
      // 密码重置邮件
    },
  },
  emailVerification: {
    sendOnSignUp: true, // 注册时自动发送
    autoSignInAfterVerification: true, // 验证后自动登录
    sendVerificationEmail: async ({ user, url }) => {
      // 验证邮件
    },
  },
});
```

## 📊 数据库表

邮件验证使用 `verification` 表：

```sql
CREATE TABLE verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,  -- 用户邮箱
  value TEXT NOT NULL,        -- 验证 token
  expiresAt TIMESTAMP NOT NULL,  -- 过期时间
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## 🚨 故障排查

### 问题：收不到验证邮件

**检查项**：
1. ✅ `RESEND_API_KEY` 是否正确配置
2. ✅ 邮箱地址是否正确
3. ✅ 检查垃圾邮件文件夹
4. ✅ 查看控制台是否有错误信息
5. ✅ 确认 Resend 账号是否正常

**解决方法**：
```bash
# 查看 Next.js 日志
npm run dev

# 注册时查看控制台输出
# 如果看到 "⚠️ RESEND_API_KEY 未配置"
# 说明环境变量未正确加载
```

### 问题：验证链接无效

**可能原因**：
- 链接已过期（超过 24 小时）
- 链接已被使用
- Token 格式错误

**解决方法**：
1. 重新注册账户
2. 或实现"重新发送验证邮件"功能

### 问题：验证成功但无法登录

**检查项**：
1. 确认 `emailVerified` 字段已更新为 `true`
2. 检查数据库连接
3. 清除浏览器 Cookie

**SQL 查询**：
```sql
-- 检查用户验证状态
SELECT id, name, email, "emailVerified" 
FROM "user" 
WHERE email = 'your-email@example.com';

-- 手动设置为已验证（仅开发环境）
UPDATE "user" 
SET "emailVerified" = true 
WHERE email = 'your-email@example.com';
```

## 🎯 生产环境检查清单

部署前确认：

- [ ] Resend API Key 已在生产环境配置
- [ ] 域名已在 Resend 验证
- [ ] EMAIL_FROM 设置为你的域名邮箱
- [ ] NEXT_PUBLIC_APP_URL 设置为生产域名
- [ ] 测试完整注册和验证流程
- [ ] 测试邮件是否进入垃圾箱
- [ ] 验证链接使用 HTTPS
- [ ] 邮件模板文案符合品牌调性

## 💰 成本估算

### Resend 免费版本
- 每月 3,000 封邮件
- 1 个验证域名
- 适合小型项目和测试

### 使用场景
- 注册验证邮件：每个新用户 1 封
- 密码重置：根据需求
- 每月 3,000 封 = 约 3,000 个新用户

### 升级
- 如果超出限额，可升级到付费计划
- 或考虑其他邮件服务（SendGrid, AWS SES）

## 📚 相关资源

- [Resend 文档](https://resend.com/docs)
- [Better Auth 邮件验证](https://better-auth.com/docs/authentication/email-verification)
- [配置域名](https://resend.com/docs/dashboard/domains/introduction)
- [邮件最佳实践](https://resend.com/docs/best-practices)

## 🔄 后续优化

可以考虑添加的功能：

1. **重新发送验证邮件**
   - 在登录页添加"重新发送"按钮
   - 限制频率（如 1 分钟一次）

2. **验证码登录**
   - 发送 6 位数验证码
   - 作为邮箱密码登录的替代方案

3. **邮件模板自定义**
   - 使用 React Email 创建更美观的模板
   - 品牌化设计

4. **多语言支持**
   - 根据用户语言发送对应邮件
   - 支持中英文切换

---

**更新时间**: 2025-11-08  
**版本**: v1.0  
**状态**: ✅ 已配置并测试

