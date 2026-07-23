"use client"

import { useEffect, useRef, useState } from "react"
import { IconPlus, IconTag, IconX } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type TicketTagsEditorProps = {
  tags: string[]
  onTagsChange: (nextTags: string[]) => void
  className?: string
  headerClassName?: string
}

export function TicketTagsEditor({
  tags,
  onTagsChange,
  className,
  headerClassName,
}: TicketTagsEditorProps) {
  const tagInputRef = useRef<HTMLInputElement>(null)
  const [tagInputValue, setTagInputValue] = useState("")
  const [isComposerOpen, setIsComposerOpen] = useState(false)

  useEffect(() => {
    if (!isComposerOpen) return

    requestAnimationFrame(() => {
      tagInputRef.current?.focus()
    })
  }, [isComposerOpen])

  const commitTagInput = () => {
    const nextTag = tagInputValue.trim()
    if (!nextTag || tags.includes(nextTag)) {
      setIsComposerOpen(false)
      return
    }

    onTagsChange([...tags, nextTag])
    setTagInputValue("")
    setIsComposerOpen(false)
  }

  return (
    <div className={cn("py-3", className)}>
      <div
        className={cn(
          "mb-2 flex items-center justify-between gap-3",
          headerClassName
        )}
      >
        <div className="inline-flex items-center gap-1.5 text-sm font-medium">
          <span>Tags</span>
          <span className="text-muted-foreground">
            {tags.length > 0 ? `All (${tags.length})` : ""}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="rounded-md text-muted-foreground"
          aria-label="Add tag"
          onClick={() => setIsComposerOpen((current) => !current)}
        >
          <IconPlus className="size-4" />
        </Button>
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex min-w-0 items-center gap-1 rounded-md border border-border bg-muted/70 px-2 py-1 text-sm font-normal text-foreground/80"
            >
              <IconTag className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate">{tag}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="size-5 rounded-full text-muted-foreground"
                onClick={() =>
                  onTagsChange(tags.filter((currentTag) => currentTag !== tag))
                }
                aria-label={`Remove ${tag}`}
              >
                <IconX className="size-3.5" />
              </Button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">No tags yet</div>
      )}

      {isComposerOpen ? (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/70 bg-background px-2.5 py-2">
          <IconTag className="size-4 text-muted-foreground" />
          <Input
            ref={tagInputRef}
            value={tagInputValue}
            onChange={(event) => setTagInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === ",") {
                event.preventDefault()
                commitTagInput()
              }

              if (event.key === "Escape") {
                event.preventDefault()
                setIsComposerOpen(false)
                setTagInputValue("")
              }
            }}
            onBlur={commitTagInput}
            placeholder="Add tag"
            className="h-8 flex-1 rounded-none border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-muted-foreground"
          />
        </div>
      ) : null}
    </div>
  )
}
