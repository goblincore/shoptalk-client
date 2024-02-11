import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayJs from "dayjs";
import { useMemo, useState, useCallback } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const localizer = dayjsLocalizer(dayJs);
import dummyEvents from "@/mocks/dummyEvents";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
const events = [
    {
      id: 0,
      title: 'Workshop',
      start: new Date(2024, 1, 8, 9, 0, 0),
      end: new Date(2024, 1, 8, 13, 0, 0),
      resourceId: [1, 2],
    },
    {
      id: 1,
      title: 'Training',
      start: new Date(2024, 1, 4, 14, 0, 0),
      end: new Date(2024, 1, 4, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: 'Booking',
      start: new Date(2024, 1, 5, 8, 30, 0),
      end: new Date(2024, 1, 5, 12, 30, 0),
      resourceId: 3,
    },
    {
      id: 10,
      title: 'Booking',
      start: new Date(2024, 1, 10, 13, 0, 0),
      end: new Date(2024, 1, 10, 13, 59, 0),
      resourceId: 1,
    },
    {
      id: 11,
      title: 'Booking',
      start: new Date(2024, 1, 12, 7, 0, 0),
      end: new Date(2024, 1, 12, 10, 30, 0),
      resourceId: 4,
    },
  
  ]

const CalendarView: React.FC = () => {
//   const defaultDate = useMemo(() => new Date(), []);
  const [myEvents, setMyEvents] = useState(events)
  const [copyEvent, setCopyEvent] = useState(true)

  const DragAndDropCalendar = withDragAndDrop(Calendar);


  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
  ]

  const toggleCopyEvent = useCallback(() => setCopyEvent((val) => !val), [])

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (Array.isArray(event.resourceId)) {
        if (copyEvent) {
          resourceId = [...new Set([...event.resourceId, resourceId])]
        } else {
          const filtered = event.resourceId.filter(
            (ev) => ev !== event.sourceResource
          )
          resourceId = [...new Set([...filtered, resourceId])]
        }
      } else if (copyEvent) {
        resourceId = [...new Set([event.resourceId, resourceId])]
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, resourceId, allDay }]
      })
    },
    [setMyEvents, copyEvent]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1972, 0, 1, 8),
    }),
    []
  )

  return (
    <section>
      {/* <Calendar
        defaultDate={defaultDate}
        localizer={localizer}
        defaultView={Views.WEEK}
        //   events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        step={15}
        timeslots={8}
      /> */}

       <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable
          scrollToTime={scrollToTime}
          selectable
          showMultiDayTimes={true}
          step={15}
        />
    </section>
  );
};

export default CalendarView;
