import {
  Button,
  ColorPicker,
  DatePicker,
  Drawer,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";
import {
  saveEventCalendar,
  updateEventCalendar,
} from "../../redux/event-calendar/eventCalendarSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const CreateEvent = ({
  onClose,
  open,
  data,
  selectedCell,
  selectedDate,
  isAdd,
  AddNewEvent,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      title: values.title,
      start_date: values.start_date.format("YYYY-MM-DD"),
      end_date: values.end_date.format("YYYY-MM-DD"),
      description: values.description,
      color: values.color,
      id: isAdd ? 0 : data.id,
    };
    try {
      if (isAdd) {
        await dispatch(saveEventCalendar(model))
          .then((response) => {
            if (
              response &&
              response.payload &&
              response.payload.statusCode === 201
            ) {
              toast.success(
                response && response.payload && response.payload.message,
                { duration: 3000 }
              );
              form.resetFields();
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            toast.error(error, { duration: 3000 });
          });
      } else {
        await dispatch(updateEventCalendar(model))
          .then((response) => {
            if (
              response &&
              response.payload &&
              response.payload.statusCode === 200
            ) {
              toast.success(
                response && response.payload && response.payload.message,
                { duration: 3000 }
              );
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            toast.error(error, { duration: 3000 });
          });
      }
    } catch (error) {}
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  return (
    <Drawer
      title={`Add/Edit Event For ${selectedDate}`}
      placement="right"
      width={600}
      onClose={onClose}
      open={open}
      maskClosable={false}
      extra={
        <Space>
          <Button type="primary" htmlType="button" onClick={handleSaveClick}>
            Save
          </Button>
        </Space>
      }
    >
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        name="user_creation"
        initialValues={{
          id: (data && data.id) || 0,
          title: (data && data.title) || "",
          start_date: !data.start_date
            ? dayjs(selectedDate)
            : dayjs(data.start_date),
          end_date: !data.end_date ? dayjs(selectedDate) : dayjs(data.end_date),
          description: (data && data.description) || "",
          color: (data && data.color) || "#1677ff",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Event Title"
          rules={[
            {
              required: true,
              message: "Enter Event Title",
            },
          ]}
        >
          <Input placeholder="Enter Event Title" />
        </Form.Item>
        {/* {!selectedDate ? ( */}
        <Form.Item
          name="start_date"
          label="Event Start Date"
          rules={[
            {
              required: true,
              message: "Enter Event Start Date",
            },
          ]}
        >
          <DatePicker defaultValue={dayjs(selectedDate)} className="w-full" />
        </Form.Item>
        <Form.Item
          name="end_date"
          label="Event End Date"
          rules={[
            {
              required: true,
              message: "Enter Event End Date",
            },
          ]}
        >
          <DatePicker defaultValue={dayjs(selectedDate)} className="w-full" />
        </Form.Item>
        {/* ) : (
          <Form.Item name="date" label="Event Date">
            <Typography>{selectedDate}</Typography>
          </Form.Item>
        )} */}
        <Form.Item name="description" label="Event Description">
          <Input.TextArea rows={3} placeholder="Enter Event Description" />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          getValueFromEvent={(clr) => {
            return "#" + clr.toHex();
          }}
        >
          <ColorPicker />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateEvent;
