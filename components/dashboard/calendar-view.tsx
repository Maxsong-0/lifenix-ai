"use client"

import type React from "react"

import { ChevronLeft, ChevronRight, Search, Plus } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { CreateEventDialog } from "@/components/dashboard/create-event-dialog"

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: string
}

interface CalendarViewProps {
  t: any
  date?: Date
  events?: CalendarEvent[]
  onDateChange?: (date: Date) => void
  onAddEvent?: (event: Omit<CalendarEvent, "id">) => void
  onEventClick?: (event: CalendarEvent) => void // Added onEventClick prop
  calendars?: { id: string; name: string; color: string }[] // Added calendars prop
}

export function CalendarView({
  t,
  date = new Date(),
  events = [],
  onDateChange,
  onAddEvent,
  onEventClick, // Destructure onEventClick
  calendars = [], // Destructure calendars
}: CalendarViewProps) {
  const [currentTimePosition, setCurrentTimePosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogInitialDate, setDialogInitialDate] = useState<Date>(new Date())
  const [dialogInitialTime, setDialogInitialTime] = useState("09:00")
  const [viewMode, setViewMode] = useState<"day" | "week">("week")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const totalMinutes = hours * 60 + minutes
      setCurrentTimePosition((totalMinutes / 1440) * 100)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const scrollPos =
        (currentTimePosition / 100) * containerRef.current.scrollHeight - containerRef.current.clientHeight / 2
      containerRef.current.scrollTop = scrollPos
    }
  }, [currentTimePosition])

  const hours = Array.from({ length: 24 }, (_, i) => i) // 0 to 23

  const daysToShow = viewMode === "week" ? 7 : 1

  const startDate = new Date(date)
  if (viewMode === "week") {
    const day = startDate.getDay()
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    startDate.setDate(diff)
  }

  const weekDays = Array.from({ length: daysToShow }).map((_, i) => {
    const current = new Date(startDate)
    current.setDate(startDate.getDate() + i)
    return {
      day: current.toLocaleDateString("en-US", { weekday: "short" }),
      date: current.getDate(),
      fullDate: new Date(current),
      isToday: new Date().toDateString() === current.toDateString(),
      isSelected: date.toDateString() === current.toDateString(),
    }
  })

  const monthYear = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const handlePrev = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() - (viewMode === "week" ? 7 : 1))
    onDateChange?.(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + (viewMode === "week" ? 7 : 1))
    onDateChange?.(newDate)
  }

  const handleToday = () => {
    onDateChange?.(new Date())
  }

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const scrollLeft = containerRef.current.scrollLeft
    const scrollTop = containerRef.current.scrollTop

    const x = e.clientX - rect.left + scrollLeft - 64 // Subtract time column width
    const y = e.clientY - rect.top + scrollTop

    if (x < 0) return // Clicked on time column

    const hour = Math.floor(y / 60)
    const colWidth = (containerRef.current.scrollWidth - 64) / daysToShow
    const dayIndex = Math.floor(x / colWidth)

    if (dayIndex >= 0 && dayIndex < daysToShow) {
      const clickedDate = weekDays[dayIndex].fullDate
      const timeString = `${String(hour).padStart(2, "0")}:00`

      setDialogInitialDate(clickedDate)
      setDialogInitialTime(timeString)
      setIsDialogOpen(true)
    }
  }

  const handleSaveEvent = (eventData: {
    title: string
    date: Date
    startTime: string
    endTime: string
    type: string
  }) => {
    const [startHours, startMinutes] = eventData.startTime.split(":").map(Number)
    const [endHours, endMinutes] = eventData.endTime.split(":").map(Number)

    const start = new Date(eventData.date)
    start.setHours(startHours, startMinutes)

    const end = new Date(eventData.date)
    end.setHours(endHours, endMinutes)

    onAddEvent?.({
      title: eventData.title,
      start,
      end,
      type: eventData.type,
    })
  }

  const rangeStart = weekDays[0].fullDate
  const rangeEnd = new Date(weekDays[weekDays.length - 1].fullDate)
  rangeEnd.setHours(23, 59, 59)

  const currentEvents = events.filter((event) => event.start >= rangeStart && event.start <= rangeEnd)

  // Helper to get color classes based on event type
  const getEventColor = (type: string) => {
    const calendar = calendars.find((c) => c.id === type)
    const color = calendar ? calendar.color : "blue"

    const colorMap: Record<string, { bg: string; border: string; text: string; time: string }> = {
      blue: {
        bg: "bg-blue-500/20 hover:bg-blue-500/30",
        border: "border-blue-500",
        text: "text-blue-100",
        time: "text-blue-300",
      },
      green: {
        bg: "bg-green-500/20 hover:bg-green-500/30",
        border: "border-green-500",
        text: "text-green-100",
        time: "text-green-300",
      },
      purple: {
        bg: "bg-purple-500/20 hover:bg-purple-500/30",
        border: "border-purple-500",
        text: "text-purple-100",
        time: "text-purple-300",
      },
      red: {
        bg: "bg-red-500/20 hover:bg-red-500/30",
        border: "border-red-500",
        text: "text-red-100",
        time: "text-red-300",
      },
      orange: {
        bg: "bg-orange-500/20 hover:bg-orange-500/30",
        border: "border-orange-500",
        text: "text-orange-100",
        time: "text-orange-300",
      },
      cyan: {
        bg: "bg-cyan-500/20 hover:bg-cyan-500/30",
        border: "border-cyan-500",
        text: "text-cyan-100",
        time: "text-cyan-300",
      },
      pink: {
        bg: "bg-pink-500/20 hover:bg-pink-500/30",
        border: "border-pink-500",
        text: "text-pink-100",
        time: "text-pink-300",
      },
      yellow: {
        bg: "bg-yellow-500/20 hover:bg-yellow-500/30",
        border: "border-yellow-500",
        text: "text-yellow-100",
        time: "text-yellow-300",
      },
    }

    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#060010] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">{monthYear}</h2>
          <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 p-1">
            <button onClick={handlePrev} className="rounded p-1 hover:bg-white/10">
              <ChevronLeft className="h-4 w-4 text-slate-400" />
            </button>
            <button onClick={handleToday} className="px-3 py-1 text-sm font-medium hover:bg-white/10 rounded">
              {t.calToday}
            </button>
            <button onClick={handleNext} className="rounded p-1 hover:bg-white/10">
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={t.calSearch}
              className="h-9 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-slate-300 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setViewMode("day")}
                className={`px-3 py-1 text-xs font-medium rounded ${viewMode === "day" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
              >
                {t.calDay}
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-1 text-xs font-medium rounded ${viewMode === "week" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
              >
                {t.calWeek}
              </button>
            </div>

            <button
              onClick={() => {
                setDialogInitialDate(date)
                setDialogInitialTime("09:00")
                setIsDialogOpen(true)
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/20"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Days Header - Sticky Top */}
        <div className="flex border-b border-white/10 bg-[#060010] shrink-0">
          <div className="w-16 flex-shrink-0 border-r border-white/10"></div> {/* Spacer for time column */}
          <div className={`grid flex-1 ${viewMode === "week" ? "grid-cols-7" : "grid-cols-1"}`}>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`flex flex-col items-center py-3 border-r border-white/5 ${index === weekDays.length - 1 ? "border-r-0" : ""} ${day.isSelected ? "bg-white/5" : ""}`}
              >
                <span className={`text-xs font-medium uppercase ${day.isToday ? "text-cyan-400" : "text-slate-400"}`}>
                  {day.day}
                </span>
                <div
                  className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold ${day.isToday ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "text-white"}`}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>
          {/* Scrollbar spacer if needed, usually handled by padding */}
          <div className="w-2"></div>
        </div>

        {/* Scrollable Area containing Time + Grid */}
        <div ref={containerRef} className="flex-1 overflow-y-auto relative custom-scrollbar" onClick={handleGridClick}>
          <div className="flex min-h-[1440px]">
            {/* Time Column - Now scrolls with content */}
            <div className="w-16 flex-shrink-0 flex flex-col border-r border-white/10 bg-[#060010]">
              <div className="relative h-full">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="absolute w-full text-right pr-3 text-xs text-slate-500"
                    style={{ top: `${hour * 60}px`, transform: "translateY(-50%)" }}
                  >
                    {hour === 0 ? "" : `${hour > 12 ? hour - 12 : hour} ${hour >= 12 ? "PM" : "AM"}`}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className={`flex-1 relative grid ${viewMode === "week" ? "grid-cols-7" : "grid-cols-1"}`}>
              {/* Horizontal Hour Lines */}
              {hours.map((hour) => (
                <div
                  key={`line-${hour}`}
                  className="absolute left-0 right-0 border-t border-white/5 w-full pointer-events-none"
                  style={{ top: `${hour * 60}px` }}
                />
              ))}

              {/* Vertical Day Lines */}
              {Array.from({ length: daysToShow }).map((_, index) => (
                <div
                  key={`col-${index}`}
                  className={`border-r border-white/5 h-full ${index === daysToShow - 1 ? "border-r-0" : ""} pointer-events-none`}
                />
              ))}

              {/* Current Time Indicator */}
              {weekDays.some((d) => d.isToday) && (
                <div
                  className="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
                  style={{ top: `${currentTimePosition}%` }}
                >
                  <div className="h-2 w-2 rounded-full bg-red-500 -ml-1 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                  <div className="h-[2px] flex-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                </div>
              )}

              {/* Events */}
              {currentEvents.map((event) => {
                let dayIndex = -1

                if (viewMode === "week") {
                  const eventDateStr = event.start.toDateString()
                  dayIndex = weekDays.findIndex((d) => d.fullDate.toDateString() === eventDateStr)
                } else {
                  if (event.start.toDateString() === weekDays[0].fullDate.toDateString()) {
                    dayIndex = 0
                  }
                }

                if (dayIndex === -1) return null

                const startMinutes = event.start.getHours() * 60 + event.start.getMinutes()
                const durationMinutes = (event.end.getTime() - event.start.getTime()) / 60000

                const colors = getEventColor(event.type)

                return (
                  <div
                    key={event.id}
                    className={`absolute z-10 m-1 rounded-md border-l-4 p-2 text-xs transition-colors cursor-pointer ${colors.border} ${colors.bg} ${colors.text}`}
                    style={{
                      top: `${startMinutes}px`,
                      height: `${Math.max(durationMinutes, 30)}px`,
                      left: `${(dayIndex / daysToShow) * 100}%`,
                      width: `${100 / daysToShow - 1}%`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick?.(event) // Call onEventClick prop
                    }}
                  >
                    <div className="font-bold truncate">{event.title}</div>
                    <div className={colors.time}>
                      {event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                      {event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <CreateEventDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveEvent}
        initialDate={dialogInitialDate}
        initialStartTime={dialogInitialTime}
        calendars={calendars}
        t={t} // Pass t prop
      />
    </div>
  )
}
