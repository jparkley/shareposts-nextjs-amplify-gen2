import { client, isAuthenticated } from "@/lib/utils/amplify-utils";
import PostCard from "@/components/posts/PostCard";
import { useReducer } from "react";

export default async function Home() {
  console.log("🚀 ~ Home ~ client:", client.models);
  const { data: posts } = await client.models.Post.list({
    selectionSet: ["title", "content", "id", "createdAt"],
    authMode: "apiKey",
  });
  console.log("🚀 ~ Home ~ posts:", posts);
  return (
    <>
      <div className="container-header">
        <h2>Share Your Thoughts</h2>
      </div>
      <div className="container-middle">
        {posts &&
          posts.map((post, idx) => (
            <div className="card" key={idx}>
              <PostCard post={post} isListPage={true} />
            </div>
          ))}
      </div>
    </>
  );
}
