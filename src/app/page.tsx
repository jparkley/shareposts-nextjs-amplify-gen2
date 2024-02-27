import { client, isAuthenticated } from "@/lib/utils/amplify-utils";
import PostCard from "@/components/posts/PostCard";import { useReducer } from "react";

export default async function Home() {

  const { data: posts } =  await client.models.Post.list({
    selectionSet: ["title", "content", "id", "createdAt"],
    authMode: "apiKey",
  })

  return (
      <>
        <div className="container-header">
          <h2>Share Your Thoughts</h2>
        </div>
        <div className="container-middle">
          {posts && posts.map((post, idx) => (
              <div className="card">
                <PostCard
                  key={idx}
                  post={post}
                  isListPage={true}
                />
              </div>
          ))}
        </div>
      </>
  );
}