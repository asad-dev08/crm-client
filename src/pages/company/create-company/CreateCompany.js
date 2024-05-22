import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCompany,
  updateCompany,
} from "../../../redux/company/companySlice";
import toast from "react-hot-toast";
import moment from "moment";

import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";

const defaultForm = {
  id: "",
  company_name: "",
  company_short_name: "",
  company_code: "",
  registration_number: "",
  tax_id: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postal_code: "",
  phone: "",
  email: "",
  website: "",
  founded_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss A"),
  industry: "",
  number_of_employees: 0,
  annual_revenue: 0,
  description: "",
};

const manipulateGroupList = (list) => {
  const data =
    list && list.groupList
      ? list.groupList.map((obj) => obj.group_id.toString())
      : [];
  return data;
};
const CreateCompany = ({ onClose, open, data, isAdd }) => {
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
      founded_date: selectedDate,
    };

    try {
      if (isAdd) {
        await dispatch(saveCompany(model))
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
        await dispatch(updateCompany(model))
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

  const buddhistLocale = {
    ...en,
    lang: {
      ...en.lang,
      fieldDateFormat: "YYYY-MM-DD",
      fieldDateTimeFormat: "YYYY-MM-DD HH:mm:ss A",
      yearFormat: "YYYY",
      cellYearFormat: "YYYY",
    },
  };
  const globalBuddhistLocale = {
    ...enUS,
    DatePicker: {
      ...enUS.DatePicker,
      lang: buddhistLocale.lang,
    },
  };
  const [selectedDate, setSelectedDate] = useState(
    data ? dayjs(data.founded_date) : dayjs(new Date())
  );
  const onChange = (_, dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <Drawer
      title="Add/Edit Company"
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
          phonePrefix: "880",

          id: (data && data.id) || 0,
          company_name: (data && data.company_name) || "",
          company_short_name: (data && data.company_short_name) || "",
          company_code: (data && data.company_code) || "",
          registration_number: (data && data.registration_number) || "",
          tax_id: (data && data.tax_id) || "",
          address: (data && data.address) || "",
          city: (data && data.city) || "",
          state: (data && data.state) || "",
          country: (data && data.country) || "",
          postal_code: (data && data.postal_code) || "",
          phone: (data && data.phone) || "",
          email: (data && data.email) || "",
          website: (data && data.website) || "",
          founded_date:
            (data && dayjs(data.founded_date)) ||
            moment(new Date()).format("YYYY-MM-DD HH:mm:ss A"),
          industry: (data && data.industry) || "",
          number_of_employees: (data && data.number_of_employees) || 0,
          annual_revenue: (data && data.annual_revenue) || 0,
          description: (data && data.description) || "",
          is_active: data && data.is_active,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="company_name"
          label="Company Name"
          rules={[
            {
              required: true,
              message: "Enter Company Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="company_short_name" label="Short Name">
          <Input />
        </Form.Item>
        <Form.Item name="company_code" label="Short Code">
          <Input />
        </Form.Item>

        <Form.Item
          name="registration_number"
          label="Registration No"
          rules={[
            {
              required: true,
              message: "Enter Unique Registration No.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tax_id"
          label="TAX ID"
          rules={[
            {
              required: true,
              message: "Enter Unique TAX ID.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="city" label="City">
          <Input />
        </Form.Item>

        <Form.Item name="state" label="State">
          <Input />
        </Form.Item>

        <Form.Item name="country" label="Country">
          <Input />
        </Form.Item>

        <Form.Item name="postal_code" label="Postal Code">
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
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Enter Phone Number",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="website" label="Website Link">
          <Input />
        </Form.Item>

        <Form.Item name="founded_date" label="Founded Date" className="w-full">
          <ConfigProvider locale={globalBuddhistLocale}>
            <DatePicker
              className="w-full"
              defaultValue={selectedDate}
              showTime
              onChange={onChange}
            />
          </ConfigProvider>
        </Form.Item>

        <Form.Item name="industry" label="Industry">
          <Input type="datetime" />
        </Form.Item>

        <Form.Item name="number_of_employees" label="No. of Employee">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="annual_revenue" label="Annual Revenue">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="description" label="Description (if any)">
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
    </Drawer>
  );
};

export default CreateCompany;
