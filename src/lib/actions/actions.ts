"use server"

import { redirect } from "next/navigation";
import { Schema } from "../../../amplify/data/resource";
import { client } from "@/lib/utils/amplify-utils";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const { data } = await client.models.Post.create({
    title: formData.get("title")?.toString() || "",
    content: formData.get("content")?.toString() || "",
  })
  console.log('===== SERVER ACTION: after creating Post', data)
  redirect("/");
}

export async function deletePost(id: string) {
  const { data, errors } = await client.models.Post.delete({ id });
  console.log('===== SERVER ACTION: after deleting Post: data', data, errors);
  revalidatePath("/");
}

export async function addComment(content: string, post: Schema["Post"]) {
  if (content.trim().length === 0) return;
  const { data:comment } = await client.models.Comment.create({
    post,
    content,
  })
  console.log('===== SERVER ACTION: after creating comment', comment)
  revalidatePath(`/posts/${post.id}`);
}

export async function getCommentsByPost(paramsId: string) {
  const { data: comments } = await client.models.Comment.list({
    authMode: "apiKey",
    selectionSet: ["content", "post.id", "id"]
  })
  console.log('===== SERVER ACTION: right after fetching comments', comments)
  const filtered = comments.filter((comment) => comment.post.id === paramsId );
  console.log('===== SERVER ACTION: filtered comments', filtered )
  return filtered;
}