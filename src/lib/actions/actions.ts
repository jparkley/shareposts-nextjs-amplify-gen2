"use server"
import { client } from "@/lib/utils/amplify-utils"
import { redirect } from "next/navigation"

export async function createPost(formData: FormData) {
  const { data } = await client.models.Post.create({
    title: formData.get("title")?.toString() || "",
    content: formData.get("content")?.toString() || "",
  })
  console.log('after create', data)
  redirect("/")
}


export async function deletePost(id: string) {
  const { data, errors } = await client.models.Post.delete({ id });
  console.log('after delete: data', data, errors);
  redirect("/");
}