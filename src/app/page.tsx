import { getAllPosts } from "@/actions/postAction";

const Home = async () => {
  const posts = await getAllPosts();

  console.log(posts);

  return <div>Home</div>;
};

export default Home;
