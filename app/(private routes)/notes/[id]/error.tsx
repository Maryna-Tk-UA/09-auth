"use client";

interface ErrorNotesProps {
  error: Error;
}

function ErrorNotes({ error }: ErrorNotesProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}

export default ErrorNotes;
