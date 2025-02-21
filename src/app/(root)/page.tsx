import { getAllPosts } from "@/actions/postAction";
import PostCard from "@/components/PostCard";

const Home = async () => {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>Liste des posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
