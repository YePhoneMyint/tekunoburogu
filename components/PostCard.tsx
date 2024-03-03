import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/lib/interface";
import Link from "next/link";
import { VT323 } from "next/font/google";

interface Prop {
  post: Post;
}

const cardStyle =
  "mb-8 border border-gray-900 shadow-sm shadow-purple-950 hover:bg-purple-500 hover:text-white hover:shadow-md hover:dark:bg-gray-950";

export const dateFont = VT323({ weight: "400", subsets: ["latin"] });

const PostCard = ({ post }: Prop) => {
  return (
    <Link href={`/posts/${post.slug.current}`}>
      <Card className={cardStyle}>
        <CardHeader>
          <CardTitle className="dark:text-slate-300">{post.title}</CardTitle>
          <CardDescription
            className={`${dateFont.className} text-base text-purple-800`}
          >
            {new Date(post.publishedAt).toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="dark:text-slate-400">
          <p>{post.excerpt}</p>
        </CardContent>
        <CardFooter>
          {post.tags.map((tag) => (
            <span
              key={tag._id}
              className="me-3 rounded-sm border p-1 text-sm lowercase dark:border-gray-900 dark:bg-gray-950"
            >
              #{tag.name}
            </span>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
