import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import {
  MdAdd,
  MdAddCircle,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import {
  saveBoard,
  updateBoard,
} from "../../../redux/task-management/taskManagementSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const CreateBoard = ({ isAdd, isOpen, handleModalClose, data, handleAdd }) => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(
    data?.columns || [{ column_name: "", id: "" }]
  );
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const model = {
      ...values,
      id: isAdd ? "" : data.id,
      columns: columns.map((x, i) => {
        return {
          ...x,
          sequence_no: i + 1,
        };
      }),
    };

    try {
      if (isAdd) {
        await dispatch(saveBoard(model))
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
        await dispatch(updateBoard(model))
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

  const addColumn = () => {
    const newColumn = {
      id: "",
      column_name: "",
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (index) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
  };

  const handleColumnChange = (value, index) => {
    const newColumns = [...columns];
    newColumns[index].column_name = value;
    setColumns(newColumns);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    form.submit();
  };
  return (
    <div>
      <Modal
        title="Create/Edit Board"
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
            columns: (data && data.columns) || "",
            is_active: data && data.is_active,
          }}
          scrollToFirstError
        >
          <Form.Item
            className="mb-3"
            name="title"
            label="Board Title"
            rules={[
              {
                required: true,
                message: "Enter Board Title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="mb-3"
            name="description"
            label="Board Description"
          >
            <Input.TextArea rows={3} placeholder="Enter Board Description" />
          </Form.Item>
          <Form.Item name="is_active" valuePropName="checked" className="mb-3">
            <Checkbox>Active?</Checkbox>
          </Form.Item>
          <Form.Item label="Columns" required>
            {columns.map((column, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Input
                  value={column.column_name}
                  onChange={(e) => handleColumnChange(e.target.value, index)}
                  style={{ marginRight: 8 }}
                />
                <Button onClick={() => removeColumn(index)}>
                  <MdRemoveCircleOutline />
                </Button>
              </div>
            ))}
            <Button
              type="primary"
              onClick={addColumn}
              style={{ width: "100%" }}
              className="flex items-center justify-center gap-1"
            >
              <MdAddCircleOutline />{" "}
              <span className="mt-[2px]">Add Column</span>
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={handleSaveClick}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateBoard;
