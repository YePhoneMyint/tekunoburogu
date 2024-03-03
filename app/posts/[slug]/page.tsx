import Header from "@/components/Header";
import { dateFont } from "@/components/PostCard";
import { Post } from "@/lib/interface";
import urlFor, { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Prop {
  params: { slug: string };
}

const getPost = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == "${slug}"] [0] {
  title,
    slug,
    publishedAt,
    excerpt,
    body,
    tags[]-> {
      _id,
      slug,
      name
    }
}`;

  const response = await client.fetch(query);
  return response;
};

export const revalidate = 15;

const Page = async ({ params: { slug } }: Prop) => {
  try {
    const post: Post = await getPost(slug);
    return (
      <div>
        <Header title={post.title} />
        <div className="text-center">
          <span className={`${dateFont.className} text-purple-500`}>
            {new Date(post.publishedAt).toDateString()}
          </span>
          <div className="mt-5">
            {post.tags.map((tag) => (
              <Link href={`/tags/${tag.slug.current}`} key={tag._id}>
                <span className="me-3 rounded-sm border p-1 text-sm lowercase dark:border-gray-900 dark:bg-gray-950">
                  #{tag.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="m-auto mt-14 max-w-2xl text-justify prose-headings:my-5 prose-headings:text-2xl prose-p:mb-5 prose-p:leading-7 prose-li:ms-5 prose-li:list-disc prose-li:leading-4">
            <PortableText
              value={post.body}
              components={myPortableImageComponent}
            />
          </div>
        </div>
      </div>
    );
  } catch (e) {
    return notFound();
  }
};

export default Page;

const myPortableImageComponent = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlFor(value).url()} width="700" height="700" alt="Image" />
    ),
  },
};
