import css from "./NotesPage.module.css";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api/clientApi";

interface NotesProps {
  searchParams: Promise<{ query?: string; page?: string }>;
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const tag = (slug?.[0] ?? "All").toString();

  const title = `${tag === "All" ? "All notes" : `${tag}`}`;
  const description = `Notes filtered by "${tag}".`;
  const url = `https://09-auth-eta-fawn.vercel.app/notes/filter/${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

async function Notes({ searchParams, params }: NotesProps) {
  const data = await searchParams;

  const search = data.query ?? "";
  const page = Math.max(Number(data.page) || 1, 1);

  const { slug } = await params; //  дістаємо з url параметр
  const tagReceived: string | undefined = slug?.[0];
  const tag = tagReceived !== "All" ? tagReceived : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", page, search, tag],
    queryFn: () => fetchNotes({ page, searchValue: search, tag }),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient
          initialPage={page}
          initialSearch={search}
          initialTag={tag ?? "All"}
        />
      </HydrationBoundary>
    </div>
  );
}

export default Notes;
