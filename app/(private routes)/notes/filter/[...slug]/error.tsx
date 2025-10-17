"use client";

interface ErrorNotesProps {
  error: Error;
}

function ErrorNotes({ error }: ErrorNotesProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default ErrorNotes;
