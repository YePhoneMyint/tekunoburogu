import Header from "@/components/Header";
import { Tag } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Link from "next/link";

const getTags = async () => {
  const query = `*[_type == "tag"] {
  name,
    slug,
    _id,
    "count": count(*[_type == "post" && references("tags", ^._id)])
}`;

  const tags = await client.fetch(query);
  return tags;
};

export const revalidate = 15;

const Page = async () => {
  const tags: Tag[] = await getTags();
  return (
    <div>
      <Header title="Tags" />
      <div>
        {tags.map((tag) => (
          <Link key={tag._id} href={`/tags/${tag.slug.current}`}>
            <div className="mb-2 border p-2 text-sm lowercase hover:text-purple-500 dark:border-gray-900 dark:bg-gray-950">
              #{tag.name} ({tag.count ? tag.count : 0})
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
