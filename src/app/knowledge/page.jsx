import React from "react";
import KnowledgeHeader from "../../components/Knowledge/KnowledgeHeader";
import KnowledgeCard from "../../components/Cards/KnowledgeCard";
import KnowledgeSearchFilter from "../../components/Knowledge/KnowledgeSearchFilter";
import Head from "next/head";


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

export default async function Knowledge({ searchParams }) {
  const categorySlug = searchParams?.category || null;
  const allCat = {
    "id": 0,
    "attributes": {
    "name": "All",
    "slug": null
    }
    }
    
  // Fetch data based on current search params
  const postsData = await fetchPosts();
  const categoriesData = await fetchCategories();

  const posts = postsData.data || [];
  const categories = [allCat,...categoriesData.data] || [];
  const pagination = postsData.meta.pagination;
 
  return (
    <>
      <Head>
        <title>Sovrenn Knowledge</title>
        <link rel="canonical" href="https://www.sovrenn.com/knowledge" />
      </Head>
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
