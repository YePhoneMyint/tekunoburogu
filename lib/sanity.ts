import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion: "v2022-03-07",
  dataset: "production",
  projectId: "pa25ro4s",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export default function urlFor(source: any) {
  return builder.image(source);
}
