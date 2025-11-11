import { source, DEFAULT_DOC_LANGUAGE, docLanguages } from "@/lib/source";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

interface PageParams {
  lang: string;
  slug?: string[];
}

export default async function LangDocsPage(props: {
  params: Promise<PageParams>;
}) {
  const { lang, slug } = await props.params;

  if (!docLanguages.includes(lang)) {
    notFound();
  }

  if (lang === DEFAULT_DOC_LANGUAGE) {
    redirect(`/docs${slug && slug.length > 0 ? `/${slug.join("/" )}` : ""}`);
  }

  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source
    .generateParams("slug", "lang")
    .filter((entry) => entry.lang !== DEFAULT_DOC_LANGUAGE)
    .map((entry) => ({
      slug: entry.slug,
      lang: entry.lang,
    }));
}

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { lang, slug } = await props.params;

  if (!docLanguages.includes(lang)) {
    notFound();
  }

  const page = source.getPage(slug, lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
