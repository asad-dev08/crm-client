import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveEmailTemplate,
  updateEmailTemplate,
} from "../../../../redux/email-template/emailTemplateSlice";
import toast from "react-hot-toast";
import { EmailEventsTypeList } from "../../../../util/actionTypes";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateTemplate = ({ onClose, open, data, isAdd }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? 0 : data.id,
    };

    try {
      if (isAdd) {
        await dispatch(saveEmailTemplate(model))
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
        await dispatch(updateEmailTemplate(model))
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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const prefixSelector = (
    <Form.Item name="phonePrefix" noStyle>
      <Select
        style={{
          width: 80,
        }}
      >
        <Select.Option value="880">+880</Select.Option>
      </Select>
    </Form.Item>
  );

  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleChange = (value) => {
    setSelectedEvent(value);
  };

  const [value, setValue] = useState("");
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          // image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Drawer
      title="Add/Edit Email Template"
      placement="right"
      width="100%"
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
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          name="user_creation"
          initialValues={{
            phonePrefix: "880",

            id: (data && data.id) || 0,
            template_name: (data && data.template_name) || "",
            email_event: (data && data.email_event) || "",
            email_subject: (data && data.email_subject) || "",
            email_body: (data && data.email_body) || "",
            email_to: (data && data.email_to) || "",
            email_cc: (data && data.email_cc) || "",
            is_active: data && data.is_active,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="template_name"
            label="Template Name"
            rules={[
              {
                required: true,
                message: "Enter Template Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="!w-full"
            name="email_event"
            label="Event Name"
            extra="Please select event when email will be sent."
            rules={[
              {
                required: true,
                message: "Please select event when email will be sent.",
              },
            ]}
          >
            <Select
              className="w-full"
              options={EmailEventsTypeList}
              defaultValue={(data && data.event_name) || null}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="email_subject"
            label="Email Subject"
            rules={[
              {
                required: true,
                message: "Enter Email Subject",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email_body"
            label="Email Body"
            rules={[
              {
                required: true,
                message: "Enter Email Body",
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
            />
          </Form.Item>

          <Form.Item
            name="email_to"
            label="Email To"
            rules={[
              {
                required: true,
                message: "Enter Email To",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="email_cc"
            label="Email CC"
            rules={[
              {
                message: "Enter Email CC",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="is_active"
            valuePropName="checked"
            {...tailFormItemLayout}
          >
            <Checkbox>Active?</Checkbox>
          </Form.Item>
        </Form>
        <div>keywords for template</div>
      </div>
    </Drawer>
  );
};

export default CreateTemplate;
