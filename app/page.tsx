import Header from "@/components/Header";
import { Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import PostCard from "@/components/PostCard";

const getPosts = async () => {
  const query = `*[_type == "post"] {
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    _id,
    tags[]-> {
      _id,
      slug,
      name
    }
  }`;
  const data = await client.fetch(query);
  return data;
};

export const revalidate = 15;

const Home = async () => {
  const posts: Post[] = await getPosts();
  console.log(posts.length);

  return (
    <div>
      <Header title="Articles" />
      {posts.length > 0 &&
        posts.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default Home;
