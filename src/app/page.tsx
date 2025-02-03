import Banner from "@/components/common/Banner";
import BlogCard from "@/components/common/Card";
import LoginModal from "@/components/Login";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {

  const blogData = {
    title: "Introducing Our New Feature",
    excerpt: "Learn all about our latest feature and how it can help you improve productivity.",
    imageUrl: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9", 
    publishedDate: "August 12, 2025",
  }
  return (
    <>
  <Banner />
  <BlogCard blog={blogData} />
  <LoginModal />
    </>
  );
}
