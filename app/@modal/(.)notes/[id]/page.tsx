import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api/clientApi";

interface DetailsProps {
  params: Promise<{ id: string }>;
}

async function NoteDetails({ params }: DetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;

// import { fetchNoteById } from "@/lib/api";
// import css from "./NotePreview.module.css";
// import BackButton from "@/app/@modal/(.)notes/[id]/NotePreview.client";

// interface NotePreviewProps {
//   params: Promise<{ id: string }>;
// }

// async function NotePreview({ params }: NotePreviewProps) {
//   const { id } = await params;
//   const note = await fetchNoteById(id);

//   return (
//     <div className={css.container}>
//       {note && (
//         <div className={css.item}>
//           <div className={css.header}>
//             <h2>{note.title}</h2>
//           </div>
//           <p className={css.content}>{note.content}</p>
//           <p className={css.date}>
//             {new Date(note.createdAt).toLocaleString()}
//           </p>
//           <p className={css.tag}>{note.tag}</p>
//           <BackButton />
//         </div>
//       )}
//     </div>
//   );
// }

// export default NotePreview;
