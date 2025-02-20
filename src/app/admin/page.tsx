import { getAllPosts } from "@/actions/postAction";
import CreatePostButton from "@/components/admin/CreatePostButton";
import PostCard from "@/components/admin/PostCard";

const ListPostsPage = async () => {
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
