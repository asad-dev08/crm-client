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
  Tabs,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCustomer,
  updateCustomer,
} from "../../../redux/customer/customerSlice";
import toast from "react-hot-toast";
import { getCurrencys } from "../../../redux/currency/currencySlice";
import { getCustomerTypes } from "../../../redux/customer-type/customerTypeSlice";

const { TabPane } = Tabs;

const CreateCustomer = ({ onClose, open, data, isAdd }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const currencyList = useSelector(
    (state) => state.currency.currencysComboList
  );
  const customerTypeList = useSelector(
    (state) => state.customerType.customerTypesComboList
  );

  useEffect(() => {
    dispatch(getCurrencys());
    dispatch(getCustomerTypes());
  }, []);

  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? 0 : data.id,
      billing: {
        address: values.billing_address,
        city: values.billing_city,
        zipcode: values.billing_zipcode,
        country: values.billing_country,
      },
      shipping: {
        address: values.shipping_address,
        city: values.shipping_city,
        zipcode: values.shipping_zipcode,
        country: values.shipping_country,
      },
    };

    try {
      if (isAdd) {
        await dispatch(saveCustomer(model))
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
        await dispatch(updateCustomer(model))
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

  const handdleSame = (e) => {
    const { checked } = e.target;
    if (checked) {
      form.setFieldsValue({
        shipping_address: form.getFieldValue("billing_address"),
        shipping_city: form.getFieldValue("billing_city"),
        shipping_zipcode: form.getFieldValue("billing_zipcode"),
        shipping_country: form.getFieldValue("billing_country"),
      });
    } else {
      form.setFieldsValue({
        shipping_address: form.getFieldValue("shipping_address"),
        shipping_city: form.getFieldValue("shipping_city"),
        shipping_zipcode: form.getFieldValue("shipping_zipcode"),
        shipping_country: form.getFieldValue("shipping_country"),
      });
    }
  };

  return (
    <Drawer
      title="Add/Edit Customer"
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
          company_website: (data && data.company_website) || "",
          vat_number: (data && data.vat_number) || "",
          phone: (data && data.phone) || "",
          email: (data && data.email) || "",
          currency: (data && data.currency) || "",
          customer_type: (data && data.customer_type) || "",
          address: (data && data.address) || "",
          city: (data && data.city) || "",
          zipcode: (data && data.zipcode) || "",
          country: (data && data.country) || "",
          is_active: data && data.is_active,

          shipping_address: data && data.shipping.address,
          shipping_city: data && data.shipping.city,
          shipping_zipcode: data && data.shipping.zipcode,
          shipping_country: data && data.shipping.country,

          billing_address: data && data.billing.address,
          billing_city: data && data.billing.city,
          billing_zipcode: data && data.billing.zipcode,
          billing_country: data && data.billing.country,
        }}
        scrollToFirstError
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Customer Details" key="1">
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
            <Form.Item
              name="vat_number"
              label="Vat Number"
              rules={[
                {
                  required: true,
                  message: "Enter Vat Number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="company_website" label="Company Website">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Adress"
              rules={[
                {
                  type: "email",
                  message: "Enter a valid Email",
                },
                {
                  required: true,
                  message: "Enter Email Adress",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="w-full"
              name="currency"
              label="Currency"
              rules={[
                {
                  required: true,
                  message: "Please select the curreny.",
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
              className="w-full"
              name="customer_type"
              label="Customer Type"
              rules={[
                {
                  required: true,
                  message: "Please select the type of customer.",
                },
              ]}
            >
              <Select
                className="w-full"
                options={customerTypeList}
                defaultValue={(data && data.customer_type) || null}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Enter Address",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  message: "Enter Vat Number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="zipcode" label="Zipcode">
              <Input />
            </Form.Item>
            <Form.Item name="country" label="Country">
              <Input />
            </Form.Item>
            <Form.Item
              name="is_active"
              valuePropName="checked"
              {...tailFormItemLayout}
            >
              <Checkbox>Active?</Checkbox>
            </Form.Item>
          </TabPane>
          <TabPane tab="Billing Address" key="2">
            <Form.Item
              name="billing_address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Enter Address",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="billing_city"
              label="City"
              rules={[
                {
                  message: "Enter Vat Number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="billing_zipcode" label="Zipcode">
              <Input />
            </Form.Item>
            <Form.Item name="billing_country" label="Country">
              <Input />
            </Form.Item>
          </TabPane>
          <TabPane tab="Shipping Address" key="3">
            <Form.Item
              name="same_as_billing"
              valuePropName="checked"
              {...tailFormItemLayout}
            >
              <Checkbox onChange={handdleSame}>
                Same as Billing Address?
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="shipping_address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Enter Address",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="shipping_city"
              label="City"
              rules={[
                {
                  message: "Enter Vat Number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="shipping_zipcode" label="Zipcode">
              <Input />
            </Form.Item>
            <Form.Item name="shipping_country" label="Country">
              <Input />
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default CreateCustomer;
