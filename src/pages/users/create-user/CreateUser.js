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
import React from "react";
import useForm from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { saveUser, updateUser } from "../../../redux/user/userSlice";
import toast from "react-hot-toast";

const defaultForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  full_name: "",
  is_active: true,
  phone: "",
  address: "",
  isPasswordReset: false,
  created_by: "",
  created_date: "",
  updated_by: "",
  updated_date: "",
};

const CreateUser = ({ onClose, open, data, isAdd }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? 0 : data.id,
    };
    try {
      if (isAdd) {
        await dispatch(saveUser(model))
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
        await dispatch(updateUser(model))
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
  return (
    <Drawer
      title="Add/Edit User"
      placement="right"
      width={600}
      onClose={onClose}
      open={open}
      maskClosable={false}
    >
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        name="user_creation"
        initialValues={{
          phonePrefix: "880",

          id: (data && data.id) || 0,
          username: (data && data.username) || "",
          password: "",
          email: (data && data.email) || "",
          full_name: (data && data.full_name) || "",
          is_active: (data && data.is_active) || true,
          phone: (data && data.phone) || "",
          address: (data && data.address) || "",
          isPasswordReset: (data && data.isPasswordReset) || false,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="full_name"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Enter Full Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Enter Username",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Enter a valid Email",
            },
            {
              required: true,
              message: "Enter Email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          extra="When user will log in first time this password need to be reset"
          rules={[
            {
              required: data && data.id !== 0 ? false : true,
              message: "Enter Password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Enter Phone Number",
            },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              message: "Enter Address",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="is_active"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox>Active?</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateUser;
