import { createPost } from "@/lib/actions/actions"

const AddPost = () => {
  return (
    <div className="container-top">
      <form action={createPost}>
        <div><h2>What's on your mind?</h2></div>
        <div className="form-post-content">
          <input type="text" name="title" id="title" placeholder='Enter post title' />
          <textarea name="content" id="content" placeholder='Enter content' rows="8"></textarea>
        </div>
        <div>
          <button type="submit">Add Post</button>
        </div>
      </form>
    </div>
  )
}

export default AddPost