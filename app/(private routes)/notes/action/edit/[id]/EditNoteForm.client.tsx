"use client";

import { useEffect, useState } from "react";
import css from "./EditNoteForm.module.css";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNoteById,
  updateNote,
  updateNoteProps,
} from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import TagSelect from "@/components/TagSelect/TagSelect";

function EditNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  useEffect(() => {
    router.prefetch(`/notes/${id}`);
  }, [id, router]);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const { mutate, status } = useMutation({
    mutationFn: (payload: updateNoteProps) => updateNote(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["note"] });
      router.replace(`/notes/${id}`);
    },
  });

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setTag(note?.tag || "Todo");
  }, [note]);

  const handleBack = () => {
    router.replace(`/notes/${id}`);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleChangeTag = (newValue: string) => {
    setTag(newValue);
  };

  const handleSaveNote = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData) as updateNoteProps;
    mutate(formValues);
    router.back();
  };

  const loading = status === "pending" || isLoading;

  if (loading) {
    return (
      <main className={css.mainContent}>
        <div className={css.loadingWrapper}>
          <Loader />
        </div>
      </main>
    );
  }

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <main className={css.main}>
      <h2>Сторінка на доопрацюванні</h2>
      <div className={css.container}>
        <h1 className={css.title}>Edit note</h1>

        <form className={css.form} action={handleSaveNote}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              className={css.input}
              value={title}
              onChange={handleChangeTitle}
              disabled={loading}
            />
            <span className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              rows={8}
              className={css.textarea}
              value={content}
              onChange={handleChangeContent}
              disabled={loading}
            />
            <span className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>

            <TagSelect
              name="tag"
              value={tag}
              onChange={handleChangeTag}
              disabled={loading}
            />
            <span className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelBtn}
              onClick={handleBack}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={loading}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditNoteForm;

//!
// "use client";

// import Loader from "@/components/Loader/Loader";
// import css from "./EditNoteForm.module.css";
// import {
//   fetchNoteById,
//   updateNote,
//   updateNoteProps,
// } from "@/lib/api/clientApi";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import TagSelect from "@/components/TagSelect/TagSelect";

// interface EditNoteFormProps {
//   noteId: string;
// }

// function EditNoteForm({ noteId }: EditNoteFormProps) {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tag, setTag] = useState("Todo");

//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", noteId],
//     queryFn: () => fetchNoteById(noteId),
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     retry: false,
//   });

//   useEffect(() => {
//     if (note) {
//       setTitle(note.title ?? "");
//       setContent(note.content ?? "");
//       setTag(note.tag ?? "Todo");
//     }
//   }, [note]);

//   const mutation = useMutation({
//     mutationFn: (payload: updateNoteProps) => updateNote(noteId, payload),
//     onSuccess: (updated) => {
//       toast.success(`Note "${updated.title}" was updated`, {
//         position: "top-center",
//         duration: 2500,
//       });
//       queryClient.setQueryData(["note", noteId], updated);
//       queryClient.invalidateQueries({ queryKey: ["note"] });
//       console.log(updated);
//     },
//     onError: () => {
//       toast.error("Something went wrong while updating the note", {
//         position: "top-center",
//         duration: 2500,
//       });
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const cleanedTitle = title.trim();

//     if (!cleanedTitle) {
//       toast.error("Title is required", {
//         position: "top-center",
//         duration: 2500,
//       });
//       return;
//     }

//     mutation.mutate({
//       title: title.trim(),
//       content,
//       tag,
//     });
//   };

//   const handleCancel = () => {
//     router.back();
//   };

//   if (isLoading) {
//     return (
//       <main className={css.main}>
//         <div className={css.container}>
//           <Loader />
//         </div>
//       </main>
//     );
//   }

//   if (error || !note) {
//     return (
//       <main className={css.main}>
//         <div className={css.container}>
//           <p>Something went wrong.</p>
//         </div>
//       </main>
//     );
//   }

//   const isPending = mutation.isPending;

//   return (
//     <main className={css.main}>
//       <div className={css.container}>
//         <h1 className={css.title}>Edit note</h1>

//         <form className={css.form} onSubmit={handleSubmit}>
//           <div className={css.formGroup}>
//             <label htmlFor="title">Title</label>
//             <input
//               id="title"
//               type="text"
//               name="title"
//               className={css.input}
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               disabled={isPending}
//             />
//             <span className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="content">Content</label>
//             <textarea
//               name="content"
//               id="content"
//               rows={8}
//               className={css.textarea}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               disabled={isPending}
//             />
//             <span className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="tag">Tag</label>

//             <TagSelect
//               name="tag"
//               value={tag}
//               onChange={setTag}
//               disabled={isPending}
//             />
//             <span className={css.error} />
//           </div>

//           <div className={css.actions}>
//             <button
//               type="button"
//               className={css.cancelBtn}
//               onClick={handleCancel}
//               disabled={isPending}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className={css.submitButton}
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <span className={css.inlineSpinner}>
//                   <span className={css.loaderDot} />
//                   <span className={css.loaderText}>Saving...</span>
//                 </span>
//               ) : (
//                 "Save changes"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default EditNoteForm;
