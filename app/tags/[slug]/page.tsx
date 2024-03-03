import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";

const getPostsByTag = async (slug: string) => {
  const query = `*[_type == "post" && references(*[_type == "tag" && slug.current == "${slug}"]._id)] {
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

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (e) {
    notFound();
  }
};

interface Prop {
  params: { slug: string };
}

export const revalidate = 15;

const Page = async ({ params: { slug } }: Prop) => {
  try {
    const posts: Post[] = await getPostsByTag(slug);
    return (
      <div>
        <Header title={`#${slug}`} />
        <div>
          {posts.map((post) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </div>
      </div>
    );
  } catch (e) {
    return notFound();
  }
};

export default Page;
