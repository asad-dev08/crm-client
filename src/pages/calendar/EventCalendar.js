import React, { useEffect, useState } from "react";
import { Button, Calendar, Card, Typography } from "antd";
import CreateEvent from "./CreateEvent";
import moment from "moment";
import { hexToRGBA } from "../../components/theme/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { getPermissionsForMenu } from "../../util/helper";
import PermittedButton from "../../components/PermittedButton/PermittedButton.tsx";
import { useLocation } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import {
  getEventCalendars,
  saveEventCalendar,
  updateEventCalendar,
} from "../../redux/event-calendar/eventCalendarSlice.js";
import dayjs from "dayjs";

const { Text } = Typography;

const EventCalendar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const menus = useSelector((state) => state.auth.menus);
  const eventList = useSelector((state) => state.eventCalendar.eventCalendars);
  const [isAdd, setIsAdd] = useState(true);

  const permission = getPermissionsForMenu(
    menus,
    location && location.pathname
  );

  useEffect(() => {
    dispatch(getEventCalendars());
  }, [open]);

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
  const [isFromButton, setIsFromButton] = useState(false);
  const handleAddButtonClick = () => {
    setOpen(true);
    setSelectedCell(null);
    setSelectedDate(moment(new Date()).format("YYYY-MM-DD"));
    setIsFromButton(true);
    setIsAdd(true);
  };

  const isDateBetween = (startDate, endDate, val) => {
    const start = moment(startDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");
    const checkDate = moment(val, "YYYY-MM-DD");

    return start.isSameOrBefore(checkDate) && checkDate.isSameOrBefore(end);
  };
  const dateCellRender = (value) => {
    const val = value.format("YYYY-MM-DD");
    const data = eventList.filter((x) => {
      const startDate = moment(x.start_date, "YYYY-MM-DD");
      const endDate = moment(x.end_date, "YYYY-MM-DD");
      const isBetween = isDateBetween(startDate, endDate, val);

      return isBetween;
    });

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
                setIsAdd(false);

                setIsFromButton(false);
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

            <PermittedButton
              text="Add Event"
              type="primary"
              icon={<MdAdd />}
              handleClick={handleAddButtonClick}
              permission={permission}
              permissionType="add"
            />
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
          data={isFromButton ? dayjs(new Date()) : selectedCell}
          selectedCell={isFromButton ? dayjs(new Date()) : selectedCell}
          selectedDate={selectedDate}
          isAdd={isAdd}
          // AddNewEvent={AddNewEvent}
        />
      )}
    </>
  );
};

export default EventCalendar;
