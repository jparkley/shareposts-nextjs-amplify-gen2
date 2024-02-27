import { client, isAuthenticated } from "@/lib/utils/amplify-utils";
import { addComment, deletePost, getCommentsByPost } from "@/lib/actions/actions";
import { Schema } from "../../../../amplify/data/resource";
import PostCard from "@/components/posts/PostCard";
import AddComment from "@/components/posts/AddComment";

// built-in params in Next.js dynamic routing
type PostParams = {
  params: {
    id: string;
  }  
}

const Post = async ({ params }: PostParams ) => {  

  if (!params.id) return null;

  const { data: post } = await client.models.Post.get(
    { id: params.id },
    {
      authMode: "apiKey",
      selectionSet: ["id", "title", "content", "createdAt"]
    }
  );  

  const comments = await getCommentsByPost(params.id)  

  return (    
      <div className="container-post">
        <PostCard
          post={post}
          isDetailPage={true}
          isLoggedIn={await isAuthenticated()}
          onDelete={deletePost}
        />
        <AddComment
          post={post as Schema["Post"]}
          addComment={addComment}
        />
        <div>
          {comments && comments.map((comment, idx) => (
            <div key={idx}>{comment.content}</div>
          ))}
        </div>
      </div>
  );
}

export default Post