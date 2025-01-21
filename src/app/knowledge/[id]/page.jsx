import ArticleDoc from "../../../components/Knowledge/ArticleDoc";
import RelatedPosts from "../../../components/Knowledge/RelatedPosts";

// Fetch article data
async function fetchArticleData(id) {
  try {
    const res = await fetch(
      `https://cms.sovrenn.com/api/posts/${id}?populate=*`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch article data");
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

// Fetch related posts
async function fetchRelatedPosts(categorySlug, articleSlug) {
  try {
    const res = await fetch(
      `https://cms.sovrenn.com/api/posts?filters[category][slug][$eq]=${categorySlug}&filters[slug][$ne]=${articleSlug}&sort=createdAt:desc&pagination[limit]=5&populate=category`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch related posts");
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

// Insert banner image into article content
async function insertBannerImage(content) {
  if (!content) return "";
  const pTagCount = (content.match(/<p/g) || []).length;
  const bannerImageHTML = `
    <div style="text-align: center; margin: 20px 0;">
      <a href="/freetrial?utm_platform=SEO&utm_source=knowledge_ad" target="_blank">
        <img src="https://dwht5p5xdhql3.cloudfront.net/BANNERS/SovrennWebAdKnowledge.png" alt="Banner Image" style="max-width: 100%; height: auto;">
      </a>
    </div>
  `;
  const position = Math.round(pTagCount / 3);
  const contentParts = content.split("</p>");
  if (contentParts.length > position) {
    contentParts.splice(position, 0, bannerImageHTML);
    return contentParts.join("</p>");
  }
  return content + bannerImageHTML;
}

// generateMetadata for dynamic metadata management
export async function generateMetadata({ params }) {
  const { id } = params;

  // Fetch article data for metadata
  const articleData = await fetchArticleData(id);

  if (!articleData?.data) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const article = articleData.data.attributes;

  return {
    title: article.title,
    description: article.excerpt || "Read the full article on Sovrenn Knowledge.",
    canonical: `https://www.sovrenn.com/knowledge/${id}`,
  };
}

export default async function KnowledgeArticlePage({ params }) {
  const { id } = params;

  const articleData = await fetchArticleData(id);
  if (!articleData?.data) {
    return (
      <div style={{ marginTop: "100px" }}>Error loading article.</div>
    );
  }

  // Fetch related posts
  const relatedPosts = await fetchRelatedPosts(
    articleData.data.attributes.category.data.attributes.slug,
    id
  );

  const content = await insertBannerImage(articleData.data.attributes.content);

  return (
    <>
      <ArticleDoc
        content={content}
        data={articleData.data.attributes}
        relatedPosts={relatedPosts?.data || []}
      />
      {relatedPosts?.data?.length ? (
        <RelatedPosts posts={relatedPosts.data} />
      ) : null}
    </>
  );
}

export async function generateStaticParams() {
  const res = await fetch("https://cms.sovrenn.com/api/posts");
  const posts = await res.json();

  return posts.data.map((post) => ({
    id: post.id.toString(),
  }));
}
