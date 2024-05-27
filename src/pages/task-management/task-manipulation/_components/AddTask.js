import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../../redux/user/userSlice";
import dayjs from "dayjs";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import moment from "moment";
import toast from "react-hot-toast";
import {
  saveTask,
  updateTask,
} from "../../../../redux/task-management/taskManagementSlice";

const AddTask = ({
  isAdd,
  isOpen,
  handleModalClose,
  data,
  handleAdd,
  columns,
  board_id,
  task_users,
  isView,
}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const users = useSelector((state) => state.user.users);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onFinish = async (values) => {
    let user = users.find((x) => x.value === values.user_id) || [];
    const taskUserId =
      (task_users && task_users.find((x) => x.user_id === user.value)) || null;

    const model = {
      ...values,
      id: isAdd ? "" : data.id,
      target_date: selectedDate,
      column_id: values.column,
      board_id: board_id,
      users: [
        {
          id: isAdd ? null : taskUserId && taskUserId.id,
          user_id: user.value,
        },
      ],
    };

    try {
      if (isAdd) {
        await dispatch(saveTask(model))
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
        await dispatch(updateTask(model))
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
    } catch (error) {
    } finally {
      handleAdd();
      handleModalClose();
    }
  };
  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };

  const [selectedColumn, setSelectedColumn] = useState(null);
  const handleChange = (value) => {
    setSelectedColumn(value);
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
    data ? dayjs(data.target_date) : dayjs(new Date())
  );
  const onChangeDate = (_, dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <>
      <Modal
        title="Create/Edit Task"
        open={isOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        maskClosable={false}
        footer
      >
        <Form
          disabled={isView}
          className="my-10 flex flex-col gap-[5px]"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          name="board_creation"
          initialValues={{
            id: (data && data.id) || 0,
            title: (data && data.title) || "",
            description: (data && data.description) || "",
            column: (data && data.column) || "",
            user_id: (data && data.user_id) || "",

            target_date:
              (data && dayjs(data.target_date)) ||
              moment(new Date()).format("YYYY-MM-DD HH:mm:ss A"),
            is_active: data && data.is_active,
          }}
          scrollToFirstError
        >
          <Form.Item
            className="mb-3"
            name="title"
            label="Task Title"
            rules={[
              {
                required: true,
                message: "Enter Task Title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="mb-3"
            name="description"
            label="Task Description"
          >
            <Input.TextArea rows={3} placeholder="Enter Task Description" />
          </Form.Item>
          <Form.Item name="is_active" valuePropName="checked" className="mb-3">
            <Checkbox>Active?</Checkbox>
          </Form.Item>
          <Form.Item
            className="!w-full"
            name="user_id"
            label="User"
            rules={[
              {
                required: true,
                message:
                  "Please select user name who will be assigned for this task.",
              },
            ]}
          >
            <Select
              className="w-full"
              options={users}
              defaultValue={(data && data.user_id) || null}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            className="!w-full"
            name="column"
            label="Column"
            rules={[
              {
                required: true,
                message:
                  "Please select column name where you want to place this task.",
              },
            ]}
          >
            <Select
              className="w-full"
              options={columns}
              defaultValue={(data && data.column) || null}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="target_date"
            label="Target Date"
            className="w-full"
            required
          >
            <ConfigProvider locale={globalBuddhistLocale}>
              <DatePicker
                className="w-full"
                defaultValue={selectedDate}
                showTime
                onChange={onChangeDate}
              />
            </ConfigProvider>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={handleSaveClick}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTask;
