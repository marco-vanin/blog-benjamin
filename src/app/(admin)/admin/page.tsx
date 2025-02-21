import { getAllPosts } from "@/actions/postAction";
import { getCurrentUser } from "@/actions/userAction";
import { auth } from "@/auth";
import CreatePostButton from "@/components/admin/CreatePostButton";
import PostCard from "@/components/admin/PostCard";
import { redirect } from "next/navigation";

const ListPostsPage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") redirect("/");

  const posts = await getAllPosts();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Liste des posts</h1>
      </div>

      <CreatePostButton />

      <div>
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ListPostsPage;
