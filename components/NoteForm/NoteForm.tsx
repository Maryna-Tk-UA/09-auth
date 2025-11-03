"use client";

import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DraftNote, useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import TagSelect from "../TagSelect/TagSelect";

function NoteForm() {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleTagChange = (newTag: string) => {
    setDraft({
      ...draft,
      tag: newTag,
    });
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(`Added a new note with title "${data.title}"`, {
        position: "top-center",
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ["note"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError: () => {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 2500,
      });
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as DraftNote;
    mutate(values);
  };

  const handleCancel = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      {isPending && <OverlayLoader />}
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
          required
          pattern=".*\S.*"
          disabled={isPending}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
          disabled={isPending}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        {
          <TagSelect
            name="tag"
            value={draft.tag}
            onChange={handleTagChange}
            disabled={isPending}
          />
        }
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
