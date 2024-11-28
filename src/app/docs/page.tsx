
export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <article className="flex-1 container mx-auto px-8 py-8 prose max-w-4xl">
        <h1>文档中心</h1>
        <p>欢迎访问文档中心。请从左侧导航栏选择要查看的内容。</p>
        <div className="mt-8">
          <h2>开始使用</h2>
          <p>
            本文档将帮助您快速了解和使用我们的产品。请点击左侧导航栏中的链接，
            查看详细的使用说明和教程。
          </p>
        </div>
      </article>
    </div>
  )
}