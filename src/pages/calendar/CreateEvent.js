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
import moment from "moment";
import React, { useState } from "react";

const CreateEvent = ({
  onClose,
  open,
  data,
  selectedDate,
  isAdd,
  AddNewEvent,
}) => {
  const [form] = Form.useForm();
  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      title: values.title,
      date: selectedDate
        ? moment(selectedDate).format("YYYY-MM-DD")
        : values.date.format("YYYY-MM-DD"),
      description: values.description,
      color: values.color,
      id: isAdd ? 0 : data.id,
    };
    AddNewEvent(model);
    // try {
    //   if (isAdd) {
    //     await dispatch(saveUser(model))
    //       .then((response) => {
    //         if (
    //           response &&
    //           response.payload &&
    //           response.payload.statusCode === 201
    //         ) {
    //           toast.success(
    //             response && response.payload && response.payload.message,
    //             { duration: 3000 }
    //           );
    //           form.resetFields();
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error submitting form:", error);
    //         toast.error(error, { duration: 3000 });
    //       });
    //   } else {
    //     await dispatch(updateUser(model))
    //       .then((response) => {
    //         if (
    //           response &&
    //           response.payload &&
    //           response.payload.statusCode === 200
    //         ) {
    //           toast.success(
    //             response && response.payload && response.payload.message,
    //             { duration: 3000 }
    //           );
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error submitting form:", error);
    //         toast.error(error, { duration: 3000 });
    //       });
    //   }
    // } catch (error) {}
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
          date: (data && data.date) || "",
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
        {!selectedDate ? (
          <Form.Item
            name="date"
            label="Event Date"
            rules={[
              {
                required: true,
                message: "Enter Event Date",
              },
            ]}
          >
            <DatePicker defaultValue={selectedDate} />
          </Form.Item>
        ) : (
          <Form.Item name="date" label="Event Date">
            <Typography>{selectedDate}</Typography>
          </Form.Item>
        )}
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
