import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

//! перенесено
// const PER_PAGE = 12;

// interface fetchNotesProps {
//   page: number;
//   searchValue: string;
//   tag?: string;
// }

// interface fetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
//   tag: string | undefined;
// }

// export async function fetchNotes({ page, searchValue, tag }: fetchNotesProps) {
//   const t = tag?.trim();
//   const isAll = t?.toLowerCase() === "all";

//   const { data } = await nextServer.get<fetchNotesResponse>("/notes", {
//     params: {
//       page,
//       perPage: PER_PAGE,
//       search: searchValue,
//       ...(t && !isAll ? { tag: t } : {}), // через спред якщо тег обрано, то по ньому отримання, якщо ні, то всі нотатки
//     },
//   });
//   return data;
// }

// export async function fetchNoteById(id: string) {
//   const { data } = await nextServer.get<Note>(`/notes/${id}`, {});
//   return data;
// }

// export interface createNoteProps {
//   title: string;
//   content?: string;
//   // tag: NoteTag;
//   tag: string;
// }

// export async function createNote(body: createNoteProps) {
//   const res = await nextServer.post<Note>("/notes", body, {});
//   return res.data;
// }

// export async function deleteNote(noteId: string) {
//   const res = await nextServer.delete<Note>(`/notes/${noteId}`, {});
//   return res.data;
// }

// export type RegisterRequest = {
//   email: string;
//   password: string;
// };

// export const register = async (data: RegisterRequest) => {
//   const res = await nextServer.post<User>("/auth/register", data);
//   return res.data;
// };

// export type LoginRequest = {
//   email: string;
//   password: string;
// };

// export const login = async (data: LoginRequest) => {
//   const res = await nextServer.post<User>("/auth/login", data);
//   return res.data;
// };

// type CheckSessionRequest = {
//   success: boolean;
// };

// export const checkSession = async () => {
//   const res = await nextServer.get<CheckSessionRequest>("/auth/session");
//   return res.data.success;
// };

// export const getMe = async () => {
//   const { data } = await nextServer.get<User>("/users/me");
//   return data;
// };

// export const logout = async (): Promise<void> => {
//   await nextServer.post("/auth/logout");
// };
//! перенесено
