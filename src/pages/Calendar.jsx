import React, { useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { Header } from "../components";

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Calendar = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const scheduleData = [
    {
      Id: 1,
      Subject: "Explosion of Betelgeuse Star",
      Location: "Space Center USA",
      StartTime: "2025-08-10T04:00:00.000Z",
      EndTime: "2025-08-10T05:30:00.000Z",
      CategoryColor: "#1aaa55",
    },
    {
      Id: 2,
      Subject: "Thule Air Crash Report",
      Location: "Newyork City",
      StartTime: "2021-01-11T06:30:00.000Z",
      EndTime: "2021-01-11T08:30:00.000Z",
      CategoryColor: "#357cd2",
    },
    {
      Id: 3,
      Subject: "Blue Moon Eclipse",
      Location: "Space Center USA",
      StartTime: "2021-01-12T04:00:00.000Z",
      EndTime: "2021-01-12T05:30:00.000Z",
      CategoryColor: "#7fa900",
    },
    {
      Id: 4,
      Subject: "Meteor Showers in 2021",
      Location: "Space Center USA",
      StartTime: "2021-01-13T07:30:00.000Z",
      EndTime: "2021-01-13T09:00:00.000Z",
      CategoryColor: "#ea7a57",
    },
  ];

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: "100%", background: "white" }}>
          <tbody>
            <tr style={{ height: "50px" }}>
              <td style={{ width: "100%" }}>
                <DatePickerComponent
                  value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Calendar;
