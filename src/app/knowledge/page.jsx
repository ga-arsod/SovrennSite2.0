import KnowledgeHeader from "../../components/Knowledge/KnowledgeHeader";
import KnowledgeCard from "../../components/Cards/KnowledgeCard";
import KnowledgeSearchFilter from "../../components/Knowledge/KnowledgeSearchFilter";

async function fetchPosts(page = 1) {
  const url = `https://cms.sovrenn.com/api/posts?sort=createdAt:desc&filters[category][slug][$ne]=chronicles&pagination[pageSize]=20&pagination[page]=${page}&populate=category`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}

async function fetchCategories() {
  const res = await fetch("https://cms.sovrenn.com/api/categories");
  const data = await res.json();
  return data;
}

export async function generateMetadata({ searchParams }) {
  const categorySlug = searchParams?.category || null;

 
  const postsData = await fetchPosts();
  const categoriesData = await fetchCategories();

  const metadata = {
    title: "Sovrenn Knowledge",
    description:
      "Explore a wide range of knowledge resources, articles, and posts related to the market, investments, and more.",
    canonical: "https://www.sovrenn.com/knowledge",
  };

  return metadata;
}

export default async function Knowledge({ searchParams }) {
  const categorySlug = searchParams?.category || null;

 
  const postsData = await fetchPosts();
  const categoriesData = await fetchCategories();

  const posts = postsData.data || [];
  const categories = [
    {
      id: 0,
      attributes: {
        name: "All",
        slug: null,
      },
    },
    ...categoriesData.data,
  ];
  const pagination = postsData.meta.pagination;

  return (
    <>
      <KnowledgeHeader />
      <KnowledgeSearchFilter categories={categories} />
      <KnowledgeCard
        initialPosts={posts}
        categories={categories}
        initialPagination={pagination}
      />
    </>
  );
}
