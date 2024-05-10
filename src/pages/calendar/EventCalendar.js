import React, { useState } from "react";
import { Button, Calendar, Card, Typography } from "antd";
import CreateEvent from "./CreateEvent";
import moment from "moment";
import { hexToRGBA } from "../../components/theme/ThemeProvider";

const { Text } = Typography;

const EventCalendar = () => {
  const [open, setOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventList, setEventList] = useState([]);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const handlePanelChange = (value) => {
    const val = value.format("YYYY-MM-DD");
    setSelectedCell(val);
    setSelectedDate(moment(val).format("YYYY-MM-DD"));
  };

  const handleSelect = (value) => {
    const val = value.format("YYYY-MM-DD");
    setOpen(true);
    setSelectedCell(val);
    setSelectedDate(moment(val).format("YYYY-MM-DD"));
  };

  const handleAddButtonClick = () => {
    setOpen(true);
    setSelectedCell(null);
    setSelectedDate(null);
  };

  const AddNewEvent = (event) => {
    setEventList([...eventList, event]);
  };

  const dateCellRender = (value) => {
    const val = value.format("YYYY-MM-DD");
    const data = eventList.filter((x) => x.date == val);
    return (
      <>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              key={Math.random()}
              className="flex items-center justify-start gap-2 hover:bg-slate-200 rounded-md px-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setSelectedCell(item);
                setSelectedDate(value.format("YYYY-MM-DD"));
                setOpen(true);
              }}
            >
              <div className="flex-[.1] flex items-center justify-center">
                <div
                  style={{ backgroundColor: item.color }}
                  className=" h-2 w-2 rounded-full"
                ></div>
              </div>
              <span className="flex-[.9]">{item.title}</span>
            </div>
          ))}
      </>
    );
  };
  const monthCellRender = (value) => {
    // Extract the month value of the current cell
    const month = value.format("MM");

    // Filter the eventList to get events only for the current month
    const data = eventList.filter(
      (item) => moment(item.date).format("MM") === month
    );
    // Render the count of events for the current month
    return data.length > 0 ? (
      <div className="notes-month flex flex-col">
        <Text type="success" className="text-xl font-bold">
          {data.length}
        </Text>
        <Text className="text-xs text-blue-500">Events for this month</Text>
      </div>
    ) : (
      <Text type="secondary" className="text-xs font-semibold">
        No Events for this month
      </Text>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <div className=" w-full grid grid-cols-1 md:grid-cols-[300px_minmax(300px,1fr)] gap-2 h-[calc(100vh-200px)]">
        <Card className="rounded-none" bodyStyle={{ padding: "10px" }}>
          <div className="w-full flex items-center justify-between">
            <Typography className="text-left font-semibold">
              Upcoming Events
            </Typography>

            <Button type="primary" onClick={handleAddButtonClick}>
              Add Event
            </Button>
          </div>
          <div className="my-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {eventList.map((ev) => (
              <div
                style={{ backgroundColor: hexToRGBA(ev.color, 0.1) }}
                key={Math.random()}
                className="flex flex-col items-start gap-2 mb-1  hover:bg-slate-200 px-3 py-1 rounded-md hover:cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div
                    style={{ backgroundColor: ev.color }}
                    className="size-3 rounded-full"
                  ></div>
                  <p>
                    <span className="text-xs font-semibold">Title: </span>
                    {ev.title}
                  </p>
                </div>
                <p className="py-2">
                  <span className="text-xs font-semibold">Date: </span>
                  <span className="text-xs font-semibold bg-green-50 text-green-600 px-1 py-1 rounded-md">
                    {moment(ev.date).format("YYYY-MMM-DD")}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Card>
        <div className="">
          <Calendar
            className=""
            onSelect={handleSelect}
            onPanelChange={handlePanelChange}
            cellRender={cellRender}
          />
        </div>
      </div>
      {open && (
        <CreateEvent
          onClose={onClose}
          open={open}
          data={selectedCell}
          selectedDate={selectedDate}
          isAdd={true}
          AddNewEvent={AddNewEvent}
        />
      )}
    </>
  );
};

export default EventCalendar;
