import { checkSession, fetchNoteById, getMe } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import EditNoteForm from "./EditNoteForm.client";

type EditNotePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EditNotePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: `Edit: ${note.title}`,
      description: `Editing note ${note.title}`,
      openGraph: {
        title: `Edit: ${note.title}`,
        description: `Editing note ${note.title}`,
        url: `https://09-auth-eta-fawn.vercel.app/notes/action/edit/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `Editing note "${note.title}"`,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Edit note",
      description: "Edit your note",
      openGraph: {
        title: "Edit note",
        description: "Edit your note",
        url: `https://09-auth-eta-fawn.vercel.app/notes/action/edit/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Edit note",
          },
        ],
      },
    };
  }
}

async function EditNotePage({ params }: EditNotePageProps) {
  const { id } = await params;

  try {
    await checkSession();
    await getMe();
  } catch {
    redirect("/sign-in");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditNoteForm />
    </HydrationBoundary>
  );
}

export default EditNotePage;
