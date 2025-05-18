"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterProps {
  currentFilter: "all" | "completed" | "pending"
  onFilterChange: (filter: "all" | "completed" | "pending") => void
}

export function Filter({ currentFilter, onFilterChange }: FilterProps) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onFilterChange("all")}
        className={cn(
          currentFilter === "all" &&
            "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
        )}
      >
        All
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onFilterChange("completed")}
        className={cn(
          currentFilter === "completed" &&
            "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
        )}
      >
        Completed
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onFilterChange("pending")}
        className={cn(
          currentFilter === "pending" &&
            "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
        )}
      >
        Pending
      </Button>
    </div>
  )
}
