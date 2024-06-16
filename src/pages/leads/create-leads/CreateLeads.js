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
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveLead, updateLead } from "../../../redux/lead/leadSlice";
import toast from "react-hot-toast";
import { getLeadSources } from "../../../redux/lead/leadSourceSlice";
import { getLeadStatuss } from "../../../redux/lead/leadStatusSlice";
import { getUsers } from "../../../redux/user/userSlice";

import moment from "moment";

import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";

const CreateLeads = ({ onClose, open, data, isAdd }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const sourceList = useSelector(
    (state) => state.leadSource.leadSourcesComboList
  );
  const statusList = useSelector(
    (state) => state.leadStatus.leadStatussComboList
  );
  const userList = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getLeadSources());
    dispatch(getLeadStatuss());
    dispatch(getUsers());
  }, []);

  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? 0 : data.id,
      contact_date: dayjs(values.contact_date).format("YYYY-MM-DD HH:mm:ss A"),
    };

    try {
      if (isAdd) {
        await dispatch(saveLead(model))
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
        await dispatch(updateLead(model))
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
  return (
    <Drawer
      title="Add/Edit Lead "
      placement="right"
      width="1000"
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
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="user_creation"
        initialValues={{
          id: (data && data.id) || 0,
          source_id: (data && data.source_id) || "",
          status_id: (data && data.status_id) || "",
          user_id: (data && data.user_id) || "",
          name: (data && data.name) || "",
          address: (data && data.address) || "",
          city: (data && data.city) || "",
          country: (data && data.country) || "",
          zipcode: (data && data.zipcode) || "",
          email: (data && data.email) || "",
          phone: (data && data.phone) || "",
          website: (data && data.website) || "",
          lead_value: (data && data.lead_value) || 0,
          description: (data && data.description) || "",
          contact_date: (data && dayjs(data.contact_date)) || dayjs(new Date()),
          is_active: data && data.is_active,
        }}
        scrollToFirstError
      >
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-center justify-between">
          <Form.Item
            className="w-full"
            name="source_id"
            label="Source"
            rules={[
              {
                required: true,
                message: "Please select source of lead.",
              },
            ]}
          >
            <Select
              className="w-full"
              options={sourceList}
              defaultValue={(data && data.source_id) || null}
            />
          </Form.Item>
          <Form.Item
            className="w-full"
            name="status_id"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status of lead.",
              },
            ]}
          >
            <Select
              className="w-full"
              options={statusList}
              defaultValue={(data && data.status_id) || null}
            />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-center justify-between">
          <Form.Item
            className="w-full"
            name="user_id"
            label="Assigned User"
            rules={[
              {
                required: true,
                message: "Please select user of lead.",
              },
            ]}
          >
            <Select
              className="w-full"
              options={userList}
              defaultValue={(data && data.user_id) || null}
            />
          </Form.Item>
          <Form.Item
            name="name"
            className="w-full"
            label="Lead Name"
            rules={[
              {
                required: true,
                message: "Enter Lead Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-start justify-between">
          <Form.Item name="address" className="w-full" label="Lead Address">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="city" className="w-full" label="Lead City">
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-center justify-between">
          <Form.Item name="country" className="w-full" label="Lead Country">
            <Input />
          </Form.Item>
          <Form.Item name="zipcode" className="w-full" label="Lead Zipcode">
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-center justify-between">
          <Form.Item name="email" className="w-full" label="Lead Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            className="w-full"
            label="Lead Phone"
            rules={[
              {
                required: true,
                message: "Please enter lead phone no.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-center justify-between">
          <Form.Item name="website" className="w-full" label="Lead Website">
            <Input />
          </Form.Item>
          <Form.Item
            name="lead_value"
            className="w-full"
            label="Lead Value"
            rules={[
              {
                required: true,
                message: "Please enter lead value.",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-center justify-between">
          <Form.Item
            name="description"
            className="w-full"
            label="Lead Description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 items-center justify-between">
          <Form.Item
            name="contact_date"
            label="Contact Date"
            className="w-full"
          >
            <DatePicker className="w-full" showTime />
          </Form.Item>
          <Form.Item
            name="is_active"
            className="w-full mt-0 md:mt-7"
            valuePropName="checked"
          >
            <Checkbox>Active?</Checkbox>
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreateLeads;
