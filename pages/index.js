import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { PostCard, Categories, PostWidget } from "@/components";
import { getPosts } from "@/services";
import { FeaturedPosts } from "@/sections";

import Lottie from "lottie-react";
import meditate from "../public/meditate.json";
import developer from "../public/developer2.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ posts }) {
  // console.log(JSON.parse(posts));
  return (
    <div className="container mx-auto px-3 lg:px-3 mb-8">
      <Head>
        <title>Kevin Blog</title>
        <link />
      </Head>

      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <Lottie loop={true} animationData={meditate} />
            <PostWidget />
            <Lottie loop={true} animationData={developer} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
