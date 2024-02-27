"use client";

import { useState } from "react";
import { Schema } from "../../../amplify/data/resource";

type AddCommentProps = {  
  post: Schema["Post"];
  addComment: ( content: string, post: Schema["Post"] ) => void;
}

const AddComment = ( { post, addComment }: AddCommentProps ) => {

  const [comment, setComment] = useState("");

  const onAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComment("");
    addComment(comment, post);
  }

  return (
    <div>
      <div className="container-comment">
        <form onSubmit={onAdd} className="form-comment">
          <input 
            type="text"
            name="comment"
            id="comment"
            placeholder="add comment"
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>

    </div>
  )
}

export default AddComment