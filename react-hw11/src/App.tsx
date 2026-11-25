import { useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  createNote,
  deleteNoteRequest,
  getNoteById,
  getNotes,
  toggleNoteRequest,
} from "@/api/notesApi"

export function App() {
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const {
    data: notes = [],
    isPending,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  })

  const {
    data: selectedNote,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useQuery({
    queryKey: ["note", selectedId],
    queryFn: () => getNoteById(selectedId as string),
    enabled: selectedId !== null,
  })

  const addNote = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      if (inputRef.current) inputRef.current.value = ""
    },
  })

  const toggleNote = useMutation({
    mutationFn: toggleNoteRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      // Також оновлюємо кеш відкритої картки деталей
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] })
    },
  })

  const deleteNote = useMutation({
    mutationFn: deleteNoteRequest,
    onSuccess: (_data, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      // Якщо ця нотатка зараз відкрита в діалозі — закриваємо діалог
      if (selectedId === deletedId) {
        setSelectedId(null)
      }
    },
  })

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const content = inputRef.current?.value.trim()
    if (!content) return
    addNote.mutate(content)
  }

  return (
    <main className="mx-auto max-w-lg p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Нотатки {isFetching && !isPending && "(Оновлення...)"}
          </CardTitle>
          <Button onClick={() => refetch()}>Оновити</Button>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <form className="flex gap-2" onSubmit={handleAdd}>
            <Input ref={inputRef} placeholder="Нова замітка..." />
            <Button type="submit" disabled={addNote.isPending}>
              {addNote.isPending ? "Додавання..." : "Додати"}
            </Button>
          </form>

          {isPending && (
            <p className="text-sm text-muted-foreground">Завантаження...</p>
          )}
          {isError && (
            <p className="text-sm text-destructive">Помилка завантаження</p>
          )}
          {!isPending && !isError && notes.length === 0 && (
            <p className="text-sm text-muted-foreground">Список порожній</p>
          )}

          <ItemGroup className="gap-2">
            {notes.map((note) => (
              <Item key={note.id} variant="outline" size="sm">
                <ItemMedia>
                  <Checkbox
                    checked={note.completed}
                    aria-label={`Позначити "${note.content}"`}
                    onCheckedChange={() =>
                      toggleNote.mutate({
                        id: note.id,
                        completed: !note.completed,
                      })
                    }
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle
                    className={
                      note.completed ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {note.content}
                  </ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedId(note.id)}
                  >
                    Деталі
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={
                      deleteNote.isPending && deleteNote.variables === note.id
                    }
                    onClick={() => deleteNote.mutate(note.id)}
                  >
                    Видалити
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>

      <Dialog
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Деталі нотатки</DialogTitle>
          </DialogHeader>

          {isDetailPending && selectedId !== null && !isDetailError && (
            <p className="text-sm text-muted-foreground">
              Завантаження деталей...
            </p>
          )}
          {isDetailError && (
            <p className="text-sm text-destructive">
              Не вдалося завантажити нотатку
            </p>
          )}
          {selectedNote && (
            <div className="flex flex-col gap-2 text-sm">
              <p>
                <strong>ID:</strong> {selectedNote.id}
              </p>
              <p>
                <strong>Текст:</strong> {selectedNote.content}
              </p>
              <p>
                <strong>Статус:</strong>{" "}
                {selectedNote.completed ? "Виконано" : "Активна"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default App
