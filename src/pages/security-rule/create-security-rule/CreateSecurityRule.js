import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tree,
} from "antd";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  saveSecurityRule,
  updateSecurityRule,
} from "../../../redux/security-rule/securityRuleSlice";
import toast from "react-hot-toast";
import { DownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function convertFlatToNested(items) {
  const map = {};
  const roots = [];

  // Create a mapping of id to item and find root items
  items.forEach((item) => {
    map[item.id] = {
      ...item,
      children: [],
      title: item.title,
      can_view: item.can_view,
      can_create: item.can_create,
      can_update: item.can_update,
      can_delete: item.can_delete,
      can_report: item.can_report,
    };
    if (!item.parent_id) {
      roots.push(map[item.id]);
    }
  });

  // Link child items to their parent
  items.forEach((item) => {
    if (item.parent_id && map[item.parent_id]) {
      map[item.parent_id].children.push(map[item.id]);
    }
  });

  return roots;
}

const CreateSecurityRule = ({ onClose, open, data, isAdd, menus }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const menuTree = convertFlatToNested(menus);

  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? 0 : data.id,
      menuPermissionList: selectedPermissions,
    };
    console.log("val: ", model);
    try {
      if (isAdd) {
        await dispatch(saveSecurityRule(model))
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
              setSelectedPermissions({});
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            toast.error(error, { duration: 3000 });
          });
      } else {
        await dispatch(updateSecurityRule(model))
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
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const handleCheckboxChange = (e, id, field) => {
    const newSelectedPermissions = { ...selectedPermissions };
    if (!newSelectedPermissions[id]) {
      newSelectedPermissions[id] = {};
    }
    newSelectedPermissions[id][field] = e.target.checked;
    setSelectedPermissions(newSelectedPermissions);
  };

  function generateTreeNodes(menuData) {
    return menuData.map((item) => {
      const selectedPermission = selectedPermissions[item.id] || {};
      if (item.children && item.children.length > 0) {
        return {
          title: (
            <Space>
              <div className="w-[200px]">{item.title}</div>
              <Checkbox
                checked={selectedPermission.can_view}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_view")}
              >
                view
              </Checkbox>
              <Checkbox
                checked={selectedPermission.can_create}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_create")}
              >
                create
              </Checkbox>
              <Checkbox
                checked={selectedPermission.can_update}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_update")}
              >
                update
              </Checkbox>
              <Checkbox
                checked={selectedPermission.can_delete}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_delete")}
              >
                delete
              </Checkbox>
              <Checkbox
                checked={selectedPermission.can_report}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_report")}
              >
                report
              </Checkbox>
            </Space>
          ),
          key: item.id,
          children: generateTreeNodes(item.children),
        };
      } else {
        return {
          title: (
            <Space>
              <div className="w-[200px]">{item.title}</div>
              <Checkbox
                checked={selectedPermission.can_view}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_view")}
              >
                view
              </Checkbox>
              <Checkbox
                checked={selectedPermission.can_create}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_create")}
              >
                create
              </Checkbox>{" "}
              <Checkbox
                checked={selectedPermission.can_update}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_update")}
              >
                update
              </Checkbox>
              <Checkbox
                checked={selectedPermission.can_delete}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_delete")}
              >
                delete
              </Checkbox>
              <Checkbox
                checked={selectedPermission.can_report}
                onChange={(e) => handleCheckboxChange(e, item.id, "can_report")}
              >
                report
              </Checkbox>
            </Space>
          ),
          key: item.id,
        };
      }
    });
  }

  return (
    <Drawer
      title="Add/Edit Security Rule"
      placement="right"
      width={800}
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
          name: (data && data.name) || "",
          description: (data && data.description) || "",
        }}
        scrollToFirstError
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Basic Info" key="1">
            <Form.Item
              name="name"
              label="Security Rule Name"
              rules={[
                {
                  required: true,
                  message: "Enter Security Rule Name",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  message: "Enter Description",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </TabPane>
          <TabPane tab="Menu Permission Tree" key="2">
            <Tree
              checkable={false}
              defaultExpandAll
              treeData={generateTreeNodes(menuTree)}
            />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default CreateSecurityRule;
