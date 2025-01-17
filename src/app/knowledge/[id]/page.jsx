// import React from "react";

// import ArticleDoc from "../../../components/Knowledge/ArticleDoc";
// import Head from "next/head";
// import RelatedPosts from "../../../components/Knowledge/RelatedPosts";

// async function fetchArticleData(id) {
//   try {
//     const res = await fetch(
//       `https://cms.sovrenn.com/api/posts/${id}?populate=*`,
//       { cache: "no-store" }
//     );
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

// async function fetchRelatedPosts(categorySlug, articleSlug) {
//   try {
//     const res = await fetch(
//       `https://cms.sovrenn.com/api/posts?filters[category][slug][$eq][0]=${categorySlug}&filters[slug][$ne][1]=${articleSlug}&sort=createdAt:desc&pagination[limit]=5&populate=category`,
//       { cache: "no-store" }
//     );
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

// async function insertBannerImage(content) {
//   const pTagCount = (content.match(/<p/g) || []).length;
//   const bannerImageHTML = `
//     <div style="text-align: center; margin: 20px 0;">
//       <a href="/freetrial?utm_platform=SEO&utm_source=knowledge_ad" target="_blank">
//         <img src="https://dwht5p5xdhql3.cloudfront.net/BANNERS/SovrennWebAdKnowledge.png" alt="Banner Image" style="max-width: 100%; height: auto;">
//       </a>
//     </div>
//   `;

//   const position = Math.round(pTagCount / 3);
//   const contentParts = content.split("</p>");
//   if (contentParts.length > position) {
//     contentParts.splice(position, 0, bannerImageHTML);
//     return contentParts.join("</p>");
//   }
//   return content + bannerImageHTML;
// }

// export default async function KnowledgeArticlePage({ params }) {
//   const { id } = params;

//   const articleData = await fetchArticleData(id);
//   if (!articleData?.data) {
//     return (
//       <>
//         <Head>
//           <title>Error</title>
//         </Head>
//         <div style={{marginTop:"100px"}}>Error loading article.</div>
//       </>
//     );
//   }

//   const relatedPosts = await fetchRelatedPosts(
//     articleData.data.attributes.category.data.attributes.slug,
//     id
//   );

//   const content = await insertBannerImage(articleData.data.attributes.content);

//   return (
//     <>
//       <Head>
//         <title>{articleData.data.attributes.title}</title>
//         <link
//           rel="canonical"
//           href={`https://www.sovrenn.com/knowledge/${id}`}
//           key="canonical"
//         />
//       </Head>
//       <ArticleDoc
//         content={content}
//         data={articleData.data.attributes}
//         relatedPosts={relatedPosts?.data || []}
//       />
//       {relatedPosts.data.length ? (
//         <RelatedPosts posts={relatedPosts?.data || []} />
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }

import React from "react";
import ArticleDoc from "../../../components/Knowledge/ArticleDoc";
import Head from "next/head";
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


export default async function KnowledgeArticlePage({ params }) {
  const { id } = params;

 
  
  const articleData = await fetchArticleData(id);
  if (!articleData?.data) {
    return (
      <>
        <Head>
          <title>Error</title>
        </Head>
        <div style={{ marginTop: "100px" }}>Error loading article.</div>
      </>
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
      <Head>
        <title>{articleData.data.attributes.title}</title>
        <link
          rel="canonical"
          href={`https://www.sovrenn.com/knowledge/${id}`}
          key="canonical"
        />
      </Head>
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
