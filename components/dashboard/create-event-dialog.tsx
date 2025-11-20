"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateEventDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: { id?: string; title: string; date: Date; startTime: string; endTime: string; type: string }) => void
  initialDate?: Date
  initialStartTime?: string
  initialEvent?: { id: string; title: string; start: Date; end: Date; type: string } | null
  calendars?: { id: string; name: string; color: string }[]
  t: any // Add t prop </CHANGE>
}

export function CreateEventDialog({
  isOpen,
  onClose,
  onSave,
  initialDate = new Date(),
  initialStartTime = "09:00",
  initialEvent,
  calendars = [
    { id: "work", name: "Work", color: "purple" },
    { id: "personal", name: "Personal", color: "cyan" },
    { id: "family", name: "Family", color: "green" },
  ],
  t, // Destructure t </CHANGE>
}: CreateEventDialogProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState(initialStartTime)
  const [endTime, setEndTime] = useState("10:00")
  const [type, setType] = useState("work")

  useEffect(() => {
    if (isOpen) {
      if (initialEvent) {
        // Edit mode
        setTitle(initialEvent.title)
        setType(initialEvent.type)

        const eventDate = initialEvent.start
        const year = eventDate.getFullYear()
        const month = String(eventDate.getMonth() + 1).padStart(2, "0")
        const day = String(eventDate.getDate()).padStart(2, "0")
        setDate(`${year}-${month}-${day}`)

        setStartTime(initialEvent.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }))
        setEndTime(initialEvent.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }))
      } else {
        // Create mode
        const year = initialDate.getFullYear()
        const month = String(initialDate.getMonth() + 1).padStart(2, "0")
        const day = String(initialDate.getDate()).padStart(2, "0")
        setDate(`${year}-${month}-${day}`)
        setStartTime(initialStartTime)

        // Set end time to 1 hour after start time
        const [hours, minutes] = initialStartTime.split(":").map(Number)
        const endHours = (hours + 1) % 24
        setEndTime(`${String(endHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`)

        setTitle("")
        // Keep previous type or default to first calendar
        if (!type && calendars.length > 0) setType(calendars[0].id)
      }
    }
  }, [isOpen, initialDate, initialStartTime, initialEvent, calendars])

  const handleSave = () => {
    if (!title || !date || !startTime || !endTime) return

    const eventDate = new Date(date)
    // Adjust for timezone offset to keep the selected date correct
    const userTimezoneOffset = eventDate.getTimezoneOffset() * 60000
    const adjustedDate = new Date(eventDate.getTime() + userTimezoneOffset)

    onSave({
      id: initialEvent?.id,
      title,
      date: adjustedDate,
      startTime,
      endTime,
      type,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#060010] border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialEvent ? t.dialogEditEventTitle : t.dialogAddEventTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-slate-300">
              {t.dialogEventTitle}
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
              placeholder="e.g. Team Sync"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date" className="text-slate-300">
              {t.dialogDate}
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-time" className="text-slate-300">
                {t.dialogStartTime}
              </Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-time" className="text-slate-300">
                {t.dialogEndTime}
              </Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-slate-300">
              {t.dialogCalendar}
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50">
                <SelectValue placeholder="Select calendar" />
              </SelectTrigger>
              <SelectContent className="bg-[#060010] border-white/10 text-white">
                {calendars.map((cal) => (
                  <SelectItem key={cal.id} value={cal.id}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-${cal.color}-500`} />
                      {cal.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white bg-transparent"
          >
            {t.dialogCancel}
          </Button>
          <Button onClick={handleSave} className="bg-cyan-500 text-white hover:bg-cyan-600">
            {initialEvent ? t.dialogUpdateEvent : t.dialogSaveEvent}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
