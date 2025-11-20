"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, Trash2, Edit2 } from "lucide-react"
import type { CalendarEvent } from "@/components/dashboard/calendar-view"

interface EventDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  event: CalendarEvent | null
  onEdit: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
  t: any // Add t prop </CHANGE>
}

export function EventDetailsDialog({ isOpen, onClose, event, onEdit, onDelete, t }: EventDetailsDialogProps) {
  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#060010] border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-3 text-slate-300">
            <Calendar className="h-5 w-5 text-cyan-500" />
            <span>
              {event.start.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Clock className="h-5 w-5 text-purple-500" />
            <span>
              {event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
              {event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Tag className="h-5 w-5 text-blue-500" />
            <span className="capitalize">{event.type}</span>
          </div>
        </div>
        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(event.id)
              onClose()
            }}
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t.dialogDelete} {/* Use translation for Delete </CHANGE> */}
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white bg-transparent"
            >
              {t.dialogClose} {/* Use translation for Close </CHANGE> */}
            </Button>
            <Button
              onClick={() => {
                onEdit(event)
                onClose()
              }}
              className="bg-cyan-500 text-white hover:bg-cyan-600"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {t.dialogEdit} {/* Use translation for Edit </CHANGE> */}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
