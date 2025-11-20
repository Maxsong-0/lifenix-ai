"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddCalendarDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (calendar: { name: string; color: string }) => void
  t: any // Add t prop </CHANGE>
}

export function AddCalendarDialog({ isOpen, onClose, onSave, t }: AddCalendarDialogProps) {
  const [name, setName] = useState("")
  const [color, setColor] = useState("blue")

  const handleSave = () => {
    if (!name) return
    onSave({ name, color })
    setName("")
    setColor("blue")
    onClose()
  }

  const colors = [
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "cyan", label: "Cyan", class: "bg-cyan-500" },
    { value: "pink", label: "Pink", class: "bg-pink-500" },
    { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#060010] border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.dialogAddCalendarTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-slate-300">
              {t.dialogCalendarName}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
              placeholder="e.g. Fitness"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color" className="text-slate-300">
              {t.dialogColor}
            </Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="bg-[#060010] border-white/10 text-white">
                {colors.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${c.class}`} />
                      {c.label}
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
            {t.dialogAdd}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
