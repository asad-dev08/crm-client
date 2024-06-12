import { Button, Modal, Input, Typography, Form } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

const propertyList = {
  div: {
    borderColor: "none",
    borderWidth: "0px",
    borderStyle: "dashed",
    textAlign: "left",
    width: "100%",
    padding: "0px",
    margin: "0px",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    gap: "0px",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  heading: {
    width: "100%",
    display: "block",
    color: "black",
    backgroundColor: "white",
    borderStyle: "dashed",
    fontSize: "16px",
    fontWeight: "400",
    padding: "5px",
    margin: "5px",
  },
  button: {
    width: "100%",
    color: "black",
    backgroundColor: "white",
    border: "1px solid lightgray",
    borderStyle: "dashed",
    fontSize: "16px",
    fontWeight: "400",
    padding: "10px 20px",
    margin: "10px",
  },
  textbox: {
    width: "100%",
    color: "black",
    backgroundColor: "white",
    border: "1px solid lightgray",
    fontSize: "16px",
    padding: "10px",
    margin: "10px",
  },
  checkbox: {
    width: "100%",
    color: "black",
    backgroundColor: "white",
    border: "1px solid lightgray",
    padding: "10px",
    margin: "10px",
  },
  radio: {
    width: "100%",
    color: "black",
    backgroundColor: "white",
    border: "1px solid lightgray",
    padding: "10px",
    margin: "10px",
  },
  dropdown: {
    width: "100%",
    color: "black",
    backgroundColor: "white",
    border: "1px solid lightgray",
    padding: "10px",
    margin: "10px",
  },
  list: {
    width: "100%",
    color: "black",
    backgroundColor: "white",
    border: "1px solid lightgray",
    padding: "10px",
    margin: "10px",
  },
  table: {
    width: "100%",
    color: "black",
    backgroundColor: "white",
    border: "1px solid lightgray",
    padding: "10px",
    margin: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
    margin: "10px",
  },
};

const DeleteElement = ({
  id,
  handleDelete,
  element,
  updateElementWithStyleFromDragged,
}) => {
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState(
    propertyList[element.type] || {}
  );
  const [changedProperties, setChangedProperties] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (key, value) => {
    setProperties((prev) => ({
      ...prev,
      [key]: value,
    }));

    setChangedProperties((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    updateElementWithStyleFromDragged(element.id, changedProperties);
    setOpen(false);
  };

  const renderElement = (properties) => {
    return (
      <Form layout="vertical" className="w-full grid grid-cols-2 gap-3">
        {properties &&
          Object.keys(properties).map((key) => (
            <Form.Item key={key} label={key}>
              <Input
                value={properties[key]}
                placeholder={key}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </Form.Item>
          ))}
      </Form>
    );
  };

  return (
    <>
      <div
        className="hover:cursor-pointer bg-blue-100 text-blue-800 flex items-center py-[2px] absolute -top-2 right-6 px-2 font-semibold rounded-md"
        onClick={handleClickOpen}
      >
        <Text className="text-[8px] hover:cursor-pointer">style</Text>
      </div>
      <div
        key={id}
        className="h-[15px] w-[15px] rounded-full bg-slate-100 text-slate-800 absolute -right-1 -top-1 flex items-center justify-center hover:cursor-pointer"
        onClick={(e) => handleDelete(e, id)}
      >
        &times;
      </div>
      <Modal
        width="100%"
        title={`Change Style of ${element && element.type}`}
        visible={open}
        onCancel={handleClose}
        footer={[
          <Button key="apply" type="primary" onClick={handleApply}>
            Apply Style
          </Button>,
        ]}
        closeIcon={<CloseOutlined />}
      >
        {renderElement(properties)}
      </Modal>
    </>
  );
};

export default DeleteElement;
