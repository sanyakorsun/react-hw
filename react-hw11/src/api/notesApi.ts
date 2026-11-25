import axios from "axios"

const api = axios.create({ baseURL: "http://localhost:3000" })

export interface NotesDTO {
  id: string
  content: string
  completed: boolean
}

export async function getNotes(): Promise<NotesDTO[]> {
  const res = await api.get<NotesDTO[]>("/notes")
  return res.data
}

export async function getNoteById(id: string): Promise<NotesDTO> {
  const res = await api.get<NotesDTO>(`/notes/${id}`)
  return res.data
}

export async function createNote(content: string): Promise<NotesDTO> {
  const res = await api.post<NotesDTO>("/notes", {
    content,
    completed: false,
  })
  return res.data
}

export async function toggleNoteRequest(payload: {
  id: string
  completed: boolean
}): Promise<NotesDTO> {
  const res = await api.patch<NotesDTO>(`/notes/${payload.id}`, {
    completed: payload.completed,
  })
  return res.data
}

export async function deleteNoteRequest(id: string): Promise<void> {
  await api.delete(`/notes/${id}`)
}
