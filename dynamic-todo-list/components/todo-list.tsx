"use client"

import type { Todo } from "@/types/todo"
import { TodoItem } from "./todo-item"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No tasks found. Add some tasks to get started!
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>
    </ScrollArea>
  )
}
