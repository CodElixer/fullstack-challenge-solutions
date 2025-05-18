"use client"

import { useEffect, useState } from "react"
import { AddTodo } from "./add-todo"
import { TodoList } from "./todo-list"
import { Filter } from "./filter"
import type { Todo } from "@/types/todo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "./mode-toggle"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch initial todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Check if we have todos in localStorage first
        const storedTodos = localStorage.getItem("todos")
        if (storedTodos) {
          const parsedTodos = JSON.parse(storedTodos)
          setTodos(parsedTodos)
          setIsLoading(false)
          return
        }

        // If no stored todos, fetch from API
        const response = await fetch("https://dummyjson.com/todos?limit=10")
        const data = await response.json()
        setTodos(data.todos)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching todos:", error)
        setIsLoading(false)
      }
    }

    fetchTodos()
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isLoading])

  // Filter todos based on selected filter
  useEffect(() => {
    if (filter === "all") {
      setFilteredTodos(todos)
    } else if (filter === "completed") {
      setFilteredTodos(todos.filter((todo) => todo.completed))
    } else {
      setFilteredTodos(todos.filter((todo) => !todo.completed))
    }
  }, [todos, filter])

  // Add a new todo
  const addTodo = async (text: string) => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: text,
          completed: false,
          userId: 1,
        }),
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
    } catch (error) {
      console.error("Error adding todo:", error)
      // Fallback to client-side addition if API fails
      const newTodo: Todo = {
        id: Date.now(),
        todo: text,
        completed: false,
        userId: 1,
      }
      setTodos([...todos, newTodo])
    }
  }

  // Toggle todo completion status
  const toggleTodo = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id)
      if (!todoToUpdate) return

      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !todoToUpdate.completed,
        }),
      })
      const updatedTodo = await response.json()

      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    } catch (error) {
      console.error("Error updating todo:", error)
      // Fallback to client-side update if API fails
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    }
  }

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      })
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
      // Fallback to client-side deletion if API fails
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white rounded-t-lg flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">Dynamic To-Do List</CardTitle>
        <ModeToggle />
      </CardHeader>
      <CardContent className="p-6">
        <AddTodo onAdd={addTodo} />
        <Filter currentFilter={filter} onFilterChange={setFilter} />
        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700 dark:border-purple-400"></div>
          </div>
        ) : (
          <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      </CardContent>
    </Card>
  )
}
