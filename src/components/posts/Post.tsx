'use client';

import { useRouter } from "next/navigation";
import { Schema } from "../../../amplify/data/resource"
import { formatContent } from "@/lib/utils/page-utils";

interface PostProps {
  post: Pick<Schema["Post"], "title" | "content" | "id">;  
}

export const PostCard = ({post}: PostProps) => {
  const router = useRouter();

  const showDetail = () => {
    router.push(`posts/${post.id}`);
  }

  return (
    <div key={post.id} className="card">
    <div className="card-header">{post.title}</div>
    <div className="card-body">
      {formatContent(post.content)}
      {/* <p>{post.createdAt}</p> */}
      </div>
      <div>
        <button onClick={showDetail}>Read more</button>
      </div>
  </div>    
  )
}