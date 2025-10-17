export type NoteTag =
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping"
  | "Ideas"
  | "Travel"
  | "Finance"
  | "Health"
  | "Important"
  | "Todo";

export interface Note {
  content: string;
  createdAt: string;
  id: string;
  tag: NoteTag;
  title: string;
  updatedAt: string;
  userId: string;
}
