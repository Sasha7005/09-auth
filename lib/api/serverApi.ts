import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { User } from "@/types/user";
import type { Note, GetNotesResponse } from "@/types/note";

async function fetchNotes(
  page: number = 1,
  search?: string,
  tag?: string,
): Promise<GetNotesResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<GetNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
async function checkSession() {
  const cookieStore = await cookies();
  const responce = await nextServer.get<{ success: boolean }>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return responce;
}

async function getMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export { fetchNotes, fetchNoteById, checkSession, getMe };
