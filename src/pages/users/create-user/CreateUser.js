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
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { saveUser, updateUser } from "../../../redux/user/userSlice";
import toast from "react-hot-toast";
import { getSecurityGroups } from "../../../redux/security-group/securityGroupSlice";
import { getCompanys } from "../../../redux/company/companySlice";
import { UserTypeList } from "../../../util/actionTypes";

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

const manipulateGroupList = (list) => {
  const data =
    list && list.groupList
      ? list.groupList.map((obj) => obj.group_id.toString())
      : [];
  return data;
};
const CreateUser = ({ onClose, open, data, isAdd }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const securityGroups = useSelector(
    (state) => state.securityGroup.securityGroupsComboList
  );
  const companies = useSelector((state) => state.company.companyForComboList);

  const [securityGroupIds, setSecurityGroupIds] = useState("");
  const [securityGroupList, setSecurityGroupList] = useState([]);
  const [securityGroupListFinal, setSecurityGroupListFinal] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const securityGroupIdsSelected = manipulateGroupList(data);

  useEffect(() => {
    dispatch(getSecurityGroups());
    dispatch(getCompanys());
  }, []);

  useEffect(() => {
    if (data && data.groupList && data.groupList.length > 0) {
      setSecurityGroupList(data.groupList);
      setSecurityGroupListFinal(data.groupList);
    }
  }, [data]);

  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? 0 : data.id,
      groupList: securityGroupList || [],
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
  const handleChangeSelect = (value) => {
    setSecurityGroupIds(value);
    let items = value.toString().split(",");

    // Convert the array elements into objects
    let objects = items.map((item) => ({ group_id: item }));

    let tmpList = [];
    for (const obj of objects) {
      const findExisting = securityGroupListFinal.find(
        (x) => x.group_id === obj.group_id
      );

      if (findExisting) {
        let tmpObj = {
          id: findExisting.id,
          group_id: obj.group_id,
        };
        tmpList.push(tmpObj);
      } else {
        let tmpObj = {
          id: null,
          group_id: obj.group_id,
        };
        tmpList.push(tmpObj);
      }
    }

    setSecurityGroupList(tmpList);
  };

  const handleChange = (value) => {
    setSelectedCompany(value);
  };
  const handleChangeType = (value) => {
    setSelectedType(value);
  };

  return (
    <Drawer
      title="Add/Edit User"
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
          username: (data && data.username) || "",
          password: "",
          email: (data && data.email) || "",
          full_name: (data && data.full_name) || "",
          is_active: data && data.is_active,
          is_admin: data && data.is_admin,
          phone: (data && data.phone) || "",
          address: (data && data.address) || "",
          isPasswordReset: (data && data.isPasswordReset) || false,

          securityGroupIdsSelected: securityGroupIdsSelected || [],
          company_id: (data && data.company_id) || "",
          user_type: (data && data.user_type) || "",
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
          <Input style={{ width: "100%" }} />
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
          className="!w-full"
          name="user_type"
          label="User Type"
          rules={[
            {
              required: true,
              message: "Please select the type of this user.",
            },
          ]}
        >
          <Select
            className="w-full"
            options={UserTypeList}
            defaultValue={(data && data.user_type) || null}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="securityGroupIdsSelected"
          label="Security Rules"
          rules={[
            {
              required: true,
              message: "Please select one or more security groups!",
            },
          ]}
        >
          <Select
            showSearch
            mode="multiple"
            placeholder="Search to Select Security Groups"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={securityGroups}
            value={securityGroupIdsSelected}
            defaultValue={securityGroupIdsSelected}
            onChange={handleChangeSelect}
          />
        </Form.Item>
        <Form.Item
          className="!w-full"
          name="company_id"
          label="Company"
          rules={[
            {
              required: true,
              message: "Please select the company of this user.",
            },
          ]}
        >
          <Select
            className="w-full"
            options={companies}
            defaultValue={(data && data.company_id) || null}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="is_active"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox>Active?</Checkbox>
        </Form.Item>
        <Form.Item
          name="is_admin"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox>Admin?</Checkbox>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateUser;
