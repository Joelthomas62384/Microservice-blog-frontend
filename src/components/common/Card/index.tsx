import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

type Blog = {
  title: string
  excerpt: string
  imageUrl: string
  publishedDate: string
}

interface BlogCardProps {
  blog: Blog
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card className="w-full max-w-xs rounded-xl border cursor-pointer text-foreground shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="grid gap-4 p-4">
        <div className="relative h-48 w-full overflow-hidden rounded-xl">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
        {/* Blog Content */}
        <div className="grid gap-1.5 ">
          <h3 className="font-semibold text-lg">{blog.title}</h3>
          <p className="text-sm text-foreground/50">{blog.excerpt}</p>
          <p className="text-xs text-foreground/50 ">{blog.publishedDate}</p>
        </div>
      </div>
    </Card>
  )
}

export default BlogCard
