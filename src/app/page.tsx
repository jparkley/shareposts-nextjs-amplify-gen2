import { client } from "@/lib/utils/amplify-utils";
import { formatContent } from "@/lib/utils/page-utils";

// import styles from "@/app/page.module.css";


export default async function Home() {

  const { data: posts } =  await client.models.Post.list({
    selectionSet: ["title", "content", "id", "createdAt"],
    authMode: "apiKey",
  })

  console.log('posts ', posts); 

  return (
      <div className="container">
        <div className="container-header">
          <h2>Share Your Thoughts</h2>
        </div>
        <div className="container-middle">
          {posts && posts.map( (post, idx) => (
            <div key={idx} className="card">
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                {formatContent(post.content)}
                <p>{post.createdAt}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
  );
}