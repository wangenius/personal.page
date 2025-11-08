/**
 * 数据库连接测试脚本
 * 运行: npx tsx scripts/test-db-connection.ts
 */

import { db } from "../src/lib/db";
import { user } from "../src/lib/db/schema";
import { sql } from "drizzle-orm";

async function testConnection() {
  console.log("🔍 测试数据库连接...\n");

  try {
    // 1. 测试基本连接
    console.log("1️⃣ 测试基本 SQL 查询...");
    const result = await db.execute(sql`SELECT NOW() as current_time, version() as pg_version`);
    console.log("✅ 数据库连接成功!");
    console.log(`   当前时间: ${result[0].current_time}`);
    console.log(`   PostgreSQL 版本: ${result[0].pg_version.split(',')[0]}\n`);

    // 2. 测试表是否存在
    console.log("2️⃣ 检查数据库表...");
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    const tableNames = tables.map((t: any) => t.table_name);
    const requiredTables = ['user', 'session', 'account', 'verification'];
    
    console.log(`   找到 ${tableNames.length} 个表:`);
    requiredTables.forEach(tableName => {
      if (tableNames.includes(tableName)) {
        console.log(`   ✅ ${tableName}`);
      } else {
        console.log(`   ❌ ${tableName} (缺失)`);
      }
    });
    console.log();

    // 3. 测试用户表查询
    console.log("3️⃣ 测试用户表查询...");
    const users = await db.select().from(user).limit(5);
    console.log(`✅ 成功查询用户表 (找到 ${users.length} 个用户)`);
    
    if (users.length > 0) {
      console.log(`   示例用户:`);
      users.forEach(u => {
        console.log(`   - ${u.name} (${u.email})`);
      });
    } else {
      console.log(`   ℹ️ 暂无用户数据 (这是正常的，注册后会有数据)`);
    }
    console.log();

    // 4. 测试写入权限
    console.log("4️⃣ 测试数据库写入权限...");
    const testUser = {
      id: `test-${Date.now()}`,
      name: "测试用户",
      email: `test-${Date.now()}@example.com`,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(user).values(testUser);
    console.log("✅ 写入测试成功");
    
    // 清理测试数据
    await db.delete(user).where(sql`${user.id} = ${testUser.id}`);
    console.log("✅ 清理测试数据成功\n");

    // 总结
    console.log("=" .repeat(50));
    console.log("🎉 所有测试通过!");
    console.log("=" .repeat(50));
    console.log("\n✨ 数据库配置正确，可以开始使用认证功能了！\n");
    
    console.log("📝 下一步:");
    console.log("   1. 运行开发服务器: npm run dev");
    console.log("   2. 访问注册页面: http://localhost:3000/signup");
    console.log("   3. 创建账户并测试登录\n");

  } catch (error: any) {
    console.error("\n❌ 数据库连接测试失败!\n");
    console.error("错误信息:", error.message);
    console.error("\n故障排查:");
    console.error("  1. 检查 .env 文件中的 DATABASE_URL 是否正确");
    console.error("  2. 确保密码中的特殊字符已正确编码");
    console.error("  3. 检查网络连接是否可以访问 Supabase");
    console.error("  4. 运行 'npm run db:push' 确保表已创建\n");
    process.exit(1);
  }
}

// 运行测试
testConnection()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("未处理的错误:", error);
    process.exit(1);
  });

