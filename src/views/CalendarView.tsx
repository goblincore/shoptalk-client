import { Calendar, dayjsLocalizer } from "react-big-calendar";

import dayJs from "dayjs";

const localizer = dayjsLocalizer(dayJs);

const CalendarView: React.FC = () => {
  return (
    <section>
      <p>ProjectInfoView</p>
      <Calendar
        localizer={localizer}
        //   events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </section>
  );
};

export default CalendarView;
