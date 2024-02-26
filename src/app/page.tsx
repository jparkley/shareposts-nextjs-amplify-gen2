import { client } from "@/lib/utils/amplify-utils";
// import styles from "@/app/page.module.css";


export default async function Home() {

  const { data: posts } =  await client.models.Post.list({
    selectionSet: ["title", "content", "id"],
    authMode: "apiKey",
  })

  console.log('posts ', posts);

  return (
    <main>
      <div className="container">
        <h2>Share Your Thoughts</h2>
        {posts && posts.map( (post, idx) => (
          <div key={idx}>
          <p>{post.title}</p>
          <p>content{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}