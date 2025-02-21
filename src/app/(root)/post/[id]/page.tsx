import { getPostById } from "@/actions/postAction";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const PostPage = async ({ params }: Props) => {
  const id = (await params).id;

  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};
export default PostPage;
