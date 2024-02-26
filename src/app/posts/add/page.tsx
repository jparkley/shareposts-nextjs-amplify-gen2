import { createPost } from "@/lib/actions/actions"


const AddPost = () => {
  return (
    <div className="container-top">
      <form action={createPost} className="post-form">
        <div><h2>What's on your mind?</h2></div>
        <div className="form-content">
          <input type="text" name="title" id="title" placeholder='Enter post title' />
          <textarea name="content" id="content" placeholder='Enter content' rows="8"></textarea>
        </div>
        <div className="form-button">
          <button type="submit">Add Post</button>
        </div>
      </form>

    </div>
  )
}

export default AddPost