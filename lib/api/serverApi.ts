import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

//
const PER_PAGE = 12;

interface fetchNotesProps {
  page: number;
  searchValue: string;
  tag?: string;
}

interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
  tag: string | undefined;
}

export async function fetchNotes({ page, searchValue, tag }: fetchNotesProps) {
  const t = tag?.trim();
  const isAll = t?.toLowerCase() === "all";

  const cookieStore = await cookies();

  const { data } = await nextServer.get<fetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: PER_PAGE,
      search: searchValue,
      ...(t && !isAll ? { tag: t } : {}), // через спред якщо тег обрано, то по ньому отримання, якщо ні, то всі нотатки
    },

    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNoteById(id: string) {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
