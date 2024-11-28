declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module '@mapbox/rehype-prism'
declare module 'rehype-slug'
declare module 'rehype-autolink-headings'
declare module 'remark-gfm' 