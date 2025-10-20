import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/serverApi";

interface DetailsProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: DetailsProps): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: note.content.slice(0, 30),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 30),
      url: `https://09-auth-eta-fawn.vercel.app/notes/${note.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
};

async function NoteDetails({ params }: DetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;
