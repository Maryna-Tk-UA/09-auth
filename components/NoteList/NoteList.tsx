import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import toast from "react-hot-toast";
import Link from "next/link";
import { deleteNote } from "@/lib/api/clientApi";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: (data) => {
      toast.remove();
      toast.success(`You deleted the note "${data.title}"`, {
        position: "top-center",
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
    onError: () => {
      toast.remove();
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 2500,
      });
    },
  });

  const handleDelete = (noteId: string) => {
    const noteForDeleting = notes.find((note) => note.id === noteId);

    const toastId = toast.custom(
      (temp) => {
        const disabled = mutation.isPending;

        return (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            className={css.confirmToast + " " + (temp.visible ? css.show : "")}
          >
            <p id="confirm-delete-title" className={css.confirmTitle}>
              Delete &quot;{noteForDeleting?.title}&quot;?
            </p>

            <p className={css.confirmText}>This action cannot be undone.</p>

            <div className={css.confirmActions}>
              <button
                type="button"
                className={css.cancelBtn}
                onClick={() => {
                  toast.dismiss(toastId);
                }}
                disabled={disabled}
              >
                Cancel
              </button>

              <button
                type="button"
                className={css.dangerBtn}
                onClick={() => {
                  mutation.mutate(noteId);
                }}
              >
                {disabled ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        );
      },
      {
        position: "top-center",
        duration: 30000,
      }
    );
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link
              href={`/notes/${note.id}`}
              className={css.link}
              prefetch={false}
            >
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
