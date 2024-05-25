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

const AddTask = ({
  isAdd,
  isOpen,
  handleModalClose,
  data,
  handleAdd,
  columns,
  setTasks,
}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const users = useSelector((state) => state.user.users);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      title: text.trim(),
      id: Math.random().toString(),
    };

    setTasks((pv) => [...pv, newCard]);

    setAdding(false);
  };

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? "" : data.id,
      target_date: selectedDate,
    };

    handleAdd(model);
    handleModalClose();

    // try {
    //   if (isAdd) {
    //     await dispatch(saveUser(model))
    //       .then((response) => {
    //         if (
    //           response &&
    //           response.payload &&
    //           response.payload.statusCode === 201
    //         ) {
    //           toast.success(
    //             response && response.payload && response.payload.message,
    //             { duration: 3000 }
    //           );
    //           form.resetFields();
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error submitting form:", error);
    //         toast.error(error, { duration: 3000 });
    //       });
    //   } else {
    //     await dispatch(updateUser(model))
    //       .then((response) => {
    //         if (
    //           response &&
    //           response.payload &&
    //           response.payload.statusCode === 200
    //         ) {
    //           toast.success(
    //             response && response.payload && response.payload.message,
    //             { duration: 3000 }
    //           );
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error submitting form:", error);
    //         toast.error(error, { duration: 3000 });
    //       });
    //   }
    // } catch (error) {}
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
    data ? dayjs(data.founded_date) : dayjs(new Date())
  );
  const onChangeDate = (_, dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <>
      {/* {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add task</span>
          <FiPlus />
        </motion.button>
      )} */}
      <Modal
        title="Create/Edit Task"
        open={isOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        maskClosable={false}
        footer
      >
        <Form
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
            user: (data && data.user_id) || "",

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
