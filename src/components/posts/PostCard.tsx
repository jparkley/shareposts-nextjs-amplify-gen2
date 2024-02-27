"use client";

import { useRouter } from "next/navigation";
import { Schema } from "../../../amplify/data/resource"
import { trimContent } from "@/lib/utils/page-utils";

type PostCardProps = {
  post: Pick<Schema["Post"], "title" | "content" | "id" | "createdAt">;
  isListPage?: boolean; // for List page(s)
  isDetailPage?: boolean; // for Detail page
  isLoggedIn?: boolean; // ToDo: update this to check if it's the owner's account (isOwner)
  onDelete?: (id: string) => void;
}

const PostCard = ({ post, isListPage, isDetailPage, isLoggedIn, onDelete }: PostCardProps) => {

  const router = useRouter();
  const showDetail = () => {
    router.push(`posts/${post.id}`);
  }

  const content = isListPage ? trimContent(post.content) : post.content;

  return (
    <div>
      <div className="card-header">{post.title}</div>
      <div className="card-body">
        {content}
        {isListPage && (
          <div>
            <button onClick={showDetail}>Read more</button>
          </div>
        )}
        {isDetailPage && (
          <div className="container-post-bottom">
            <p>{post.createdAt}</p>
          </div>
        )}
        {(isLoggedIn && !!onDelete) && <button onClick={() => onDelete(post.id)}>x</button>}
      </div>
    </div>
  )
}

export default PostCard;