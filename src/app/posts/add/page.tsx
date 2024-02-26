import { createPost } from "@/lib/actions/actions"


const AddPost = () => {
  return (
    <div>
      <h2>AddPost</h2>
      <form action={createPost}>
        <input type="text" name="title" id="title" placeholder='Title' className='' />
        <input type="text" name="content" id="content" placeholder='content' className='' />
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default AddPost