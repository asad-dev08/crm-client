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
import {
  saveCampaign,
  updateCampaign,
} from "../../../redux/campaign/campaignSlice";
import toast from "react-hot-toast";

import moment from "moment";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";
import { getCampaignTypes } from "../../../redux/campaign/campaignTypeSlice";
import { getCampaignAudiences } from "../../../redux/campaign/campaignAudienceSlice";
import { getCampaignStatuss } from "../../../redux/campaign/campaignStatusSlice";
import { getCurrencys } from "../../../redux/currency/currencySlice";

const CreateCampaign = ({ onClose, open, data, isAdd }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const typeList = useSelector(
    (state) => state.campaignType.campaignTypesComboList
  );
  const audienceList = useSelector(
    (state) => state.campaignAudience.campaignAudiencesComboList
  );
  const statusList = useSelector(
    (state) => state.campaignStatus.campaignStatussComboList
  );
  const currencyList = useSelector(
    (state) => state.currency.currencysComboList
  );

  useEffect(() => {
    dispatch(getCampaignTypes());
    dispatch(getCampaignAudiences());
    dispatch(getCampaignStatuss());
    dispatch(getCurrencys());
  }, []);

  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? 0 : data.id,
      from_date: dayjs(values.from_date).format("YYYY-MM-DD HH:mm:ss A"),
      to_date: dayjs(values.to_date).format("YYYY-MM-DD HH:mm:ss A"),
    };

    try {
      if (isAdd) {
        await dispatch(saveCampaign(model))
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
        await dispatch(updateCampaign(model))
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

  return (
    <Drawer
      title="Add/Edit Campaign"
      placement="right"
      width="800"
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
          type: (data && data.type) || "",
          value: (data && data.value) || "",
          currency: (data && data.currency) || "",
          from_date: (data && dayjs(data.from_date)) || dayjs(new Date()),
          to_date: (data && dayjs(data.to_date)) || dayjs(new Date()),
          status: (data && data.status) || "",
          description: (data && data.description) || "",
          target_audience: (data && data.target_audience) || "",
          is_active: data && data.is_active,
        }}
        scrollToFirstError
        labelWrap
      >
        <Form.Item
          name="name"
          label="Campaign Name"
          rules={[
            {
              required: true,
              message: "Enter Campaign Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="type"
          label="Campaign Type"
          rules={[
            {
              required: true,
              message: "Please select type of campaign.",
            },
          ]}
        >
          <Select
            className="w-full"
            options={typeList}
            defaultValue={(data && data.type) || null}
          />
        </Form.Item>
        <Form.Item
          name="value"
          label="Campaign Value"
          rules={[
            {
              required: true,
              message: "Enter Campaign Value",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="currency"
          label="Currency"
          rules={[
            {
              required: true,
              message: "Please select currency.",
            },
          ]}
        >
          <Select
            className="w-full"
            options={currencyList}
            defaultValue={(data && data.currency) || null}
          />
        </Form.Item>
        <Form.Item
          name="from_date"
          label="Campaign Date From"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Please give a date from which campaign starts",
            },
          ]}
        >
          <DatePicker className="w-full" showTime />
        </Form.Item>

        <Form.Item
          name="to_date"
          label="Campaign Date To"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Please give a date from which campaign ends",
            },
          ]}
        >
          <DatePicker className="w-full" showTime />
        </Form.Item>

        <Form.Item
          className="w-full"
          name="status"
          label="Campaign Status"
          rules={[
            {
              required: true,
              message: "Please select status.",
            },
          ]}
        >
          <Select
            className="w-full"
            options={statusList}
            defaultValue={(data && data.status) || null}
          />
        </Form.Item>

        <Form.Item
          className="w-full"
          name="target_audience"
          label="Campaign's Target Audience"
          rules={[
            {
              required: true,
              message: "Please select target audience.",
            },
          ]}
        >
          <Select
            className="w-full"
            options={audienceList}
            defaultValue={(data && data.target_audience) || null}
          />
        </Form.Item>
        <Form.Item name="description" label="Campaign Description">
          <Input.TextArea rows={3} />
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

export default CreateCampaign;
