import { Section, Container, Article, Main } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { GET_POST_BY_SLUG_FUNC } from "@/lib/wordpressQueries";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  try {
    const post = await GET_POST_BY_SLUG_FUNC(params.slug, params.locale);

    return {
      title: post?.title || "Post Not Found",
      description: post?.excerpt || "No description available",
    };
  } catch (error) {
    console.error("Metadata Error:", error);
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  let post;
  try {
    post = await GET_POST_BY_SLUG_FUNC(params.slug, params.locale);
  } catch (error) {
    notFound(); // Redirect to 404 page if post fetch fails
  }

  const date = post?.date
    ? new Date(post.date).toLocaleDateString(params.locale, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown Date";

  return (
    <Section>
      <Container>
        <h1>
          <Balancer>
            <span
              dangerouslySetInnerHTML={{
                __html: post?.title || "Untitled Post",
              }}
            />
          </Balancer>
        </h1>

        <div className="flex justify-between items-center gap-4 text-sm mb-4">
          <h5>
            Published {date} by{" "}
            {post?.author?.node?.name ? (
              <span>
                <Link href={`/posts/?author=${post.author.node.id}`}>
                  {post.author.node.name}
                </Link>
              </span>
            ) : (
              "Unknown Author"
            )}
          </h5>
          {post?.categories?.nodes?.[0]?.name && (
            <Link
              href={`/posts/?category=${post.categories.nodes[0].id}`}
              className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
            >
              {post.categories.nodes[0].name}
            </Link>
          )}
        </div>
        <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
          <Image
            className="w-full"
            src={
              post?.featuredImage?.node?.sourceUrl ||
              "/placeholder-transparent.png"
            }
            alt={
              post?.featuredImage?.node?.altText || post?.title || "Post Image"
            }
            width={800}
            height={600}
          />
        </div>
        <Article
          dangerouslySetInnerHTML={{
            __html: post?.content || "<p>No content available.</p>",
          }}
        />
      </Container>
    </Section>
  );
}
