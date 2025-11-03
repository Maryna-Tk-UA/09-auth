"use client";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchNoteById } from "@/lib/api/clientApi";
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";

function NotePreviewClient() {
  //!
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  //!
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClick = () => {
    router.back();
  };

  if (isLoading) return <OverlayLoader />;

  if (error || !note) return <p>Something went wrong.</p>;
  return (
    <Modal onClose={handleClick}>
      <div className={css.container}>
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {/* {new Date(note.createdAt).toLocaleString()} */}
              {mounted && (
                <time dateTime={note.createdAt}>
                  {new Intl.DateTimeFormat("uk-UA", {
                    timeZone: "Europe/Kyiv",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(new Date(note.createdAt))}
                </time>
              )}
            </p>
            <button className={css.backBtn} onClick={handleClick}>
              Back
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
