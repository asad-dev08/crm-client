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
  saveCurrency,
  updateCurrency,
} from "../../../redux/currency/currencySlice";
import toast from "react-hot-toast";

const CreateCurrency = ({ onClose, open, data, isAdd }) => {
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
        await dispatch(saveCurrency(model))
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
        await dispatch(updateCurrency(model))
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
      title="Add/Edit  Currency"
      placement="right"
      width="600"
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
          phonePrefix: "880",

          id: (data && data.id) || 0,
          name: (data && data.name) || "",
          conversion_rate: (data && data.conversion_rate) || "",
          is_active: data && data.is_active,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Currency Name"
          rules={[
            {
              required: true,
              message: "Enter Currency Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="conversion_rate"
          label="Conversion Rate"
          rules={[
            {
              required: true,
              message: "Enter Conversion Rate",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="is_active"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox>Active?</Checkbox>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateCurrency;
