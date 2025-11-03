"use client";

import { useParams, useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchNoteById } from "@/lib/api/clientApi";
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";
// import { useEffect, useState } from "react";
// import { Note } from "@/types/note";

//  Отримання даних обраної нотатки за допомогою useQuery та
// її відображення.
//  Для отримання динамічного id використати useParams()
//  Витягти isLoading та error
//  Клієнт створює розмітку

function NoteDetailsClient() {
  //? в коментах - паралельний запит
  // const [viewNote, setViewNote] = useState<Note | null>(null);
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

  const handleBack = () => {
    router.back();
  };

  // useEffect(() => {
  //   if (!note) return;
  //   const fn = async () => {
  //     const response = await fetchNoteById(note.id);
  //     setViewNote(response);
  //   };
  //   fn();
  // }, [note]);

  if (isLoading) return <OverlayLoader />;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
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
          <button className={css.backBtn} onClick={handleBack}>
            Back
          </button>
          {/* {viewNote && <p className={css.test}>{viewNote.title}</p>} */}
        </div>
      )}
    </div>
  );
}

export default NoteDetailsClient;
