import { getAllPosts } from "@/actions/postAction";
import PostCard from "@/components/admin/PostCard";

const ListPostsPage = async () => {
  const posts = await getAllPosts();
  console.log(posts);

  return (
    <div>
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ListPostsPage;
