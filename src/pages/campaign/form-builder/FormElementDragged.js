import {
    Button,
    Checkbox,
    Form,
    Input,
    List,
    Radio,
    Select,
    Table,
    Typography,
    Modal,
    Image,
} from "antd";
import React from "react";
import DeleteElement from "./DeleteElement";

const { Text } = Typography;
const { Option } = Select;

const FormElementDragged = (props) => {
    const {
        element,
        onDragOver,
        handleDrop,
        handleDeleteEL,
        updateElementWithStyle,
    } = props;
    const [form] = Form.useForm();

    const handleFormElementDrop = (e, id) => {
        e.stopPropagation();
        handleDrop(e, id); // Call the onDrop function from the prop
    };

    const gridStyle = (length, isrow) => {
        return {
            display: "grid",
            gridTemplateColumns: `repeat(${
                isrow ? length : 1
            }, minmax(0, 1fr))`,
            gap: "16px",
            alignItems: "start",
        };
    };

    const handleDelete = (e, id) => {
        handleDeleteEL(e, id);
    };

    const updateElementWithStyleFromDragged = (id, obj) => {
        updateElementWithStyle(id, obj);
    };

    const renderElement = (element) => {
        switch (element.type) {
            case "div":
                return (
                    <div
                        id={element.id}
                        className={`relative w-full border border-dashed border-slate-400 px-2 pt-4 pb-6 my-2 text-slate-800 `}
                        style={{
                            ...gridStyle(
                                element.children.length,
                                element.isRowWise
                            ),
                            ...element.customStyle,
                        }}
                        onDragOver={onDragOver}
                        onDrop={(e) => handleFormElementDrop(e, element.id)}
                    >
                        {element.children &&
                            element.children.map((childElement) => (
                                <FormElementDragged
                                    key={childElement.id}
                                    element={childElement}
                                    onDragOver={onDragOver}
                                    handleDrop={handleDrop}
                                    handleDeleteEL={handleDeleteEL}
                                    updateElementWithStyle={
                                        updateElementWithStyle
                                    }
                                />
                            ))}
                        {!element.isRowWise && (
                            <Text
                                type="secondary"
                                className="absolute text-blue-600 left-[50%] bottom-0 translate-x-[-50%]"
                            >
                                drag item here
                            </Text>
                        )}
                        {element.id !== "div1" && (
                            <DeleteElement
                                id={element.id}
                                handleDelete={handleDelete}
                                element={element}
                                updateElementWithStyleFromDragged={
                                    updateElementWithStyleFromDragged
                                }
                            />
                        )}
                    </div>
                );
            case "button":
                return (
                    <div className="relative border border-dashed border-slate-100">
                        <Form.Item>
                            <Button
                                key={element.id}
                                id={element.id}
                                name={element.elementName}
                                type="primary"
                                className="my-2"
                                htmlType="submit"
                                style={{ ...element.customStyle }}
                            >
                                {element.buttonLabel}
                            </Button>
                        </Form.Item>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            case "textbox":
                return (
                    <div className="relative border border-dashed border-slate-100">
                        {element.textboxLabel && (
                            <Typography>{element.textboxLabel}</Typography>
                        )}
                        <Form.Item
                            name={element.elementName}
                            rules={[
                                {
                                    required: !!element.isRequired,
                                    message: element.requiredMessage,
                                },
                            ]}
                        >
                            <Input
                                type={element.textboxType}
                                key={element.id}
                                id={element.id}
                                placeholder={element.textboxPlaceholder}
                                // addonBefore={element.content}
                                className="my-2"
                                style={{ ...element.customStyle }}
                            />
                        </Form.Item>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            case "checkbox":
                return (
                    <div className="relative border border-dashed border-slate-100">
                        {element.checkboxLabel && (
                            <Typography>{element.checkboxLabel}</Typography>
                        )}
                        <Form.Item
                            name={element.elementName}
                            id={element.id}
                            style={{
                                ...element.customStyle,
                            }}
                            rules={[
                                {
                                    required: !!element.isRequired,
                                    message: element.requiredMessage,
                                },
                            ]}
                        >
                            <Checkbox.Group options={element.checkboxOptions} />
                        </Form.Item>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            case "radio":
                return (
                    <div className="relative border border-dashed border-slate-100">
                        {element.radioLabel && (
                            <Typography>{element.radioLabel}</Typography>
                        )}
                        <Form.Item
                            id={element.id}
                            name={element.elementName}
                            style={{
                                ...element.customStyle,
                            }}
                            rules={[
                                {
                                    required: !!element.isRequired,
                                    message: element.requiredMessage,
                                },
                            ]}
                        >
                            <Radio.Group
                                defaultValue={
                                    element &&
                                    element.radioOptions &&
                                    element.radioOptions.length > 0 &&
                                    element.radioOptions[0]
                                }
                            >
                                {element &&
                                    element.radioOptions &&
                                    element.radioOptions.length > 0 &&
                                    element.radioOptions.map((item, i) => (
                                        <Radio value={item}>{item}</Radio>
                                    ))}
                            </Radio.Group>
                        </Form.Item>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            case "label":
                return (
                    <div className="relative border border-dashed border-slate-100">
                        <Text
                            key={element.id}
                            id={element.id}
                            style={{ ...element.customStyle }}
                            className="my-2"
                        >
                            {element.labelLabel}
                        </Text>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            case "dropdown":
                return (
                    <div className="relative border border-dashed border-slate-100">
                        {element.dropdownLabel && (
                            <Typography>{element.dropdownLabel}</Typography>
                        )}
                        <Form.Item
                            name={element.elementName}
                            // label={element.dropdownLabel}
                            id={element.id}
                            style={{
                                ...element.customStyle,
                            }}
                            rules={[
                                {
                                    required: !!element.isRequired,
                                    message: element.requiredMessage,
                                },
                            ]}
                        >
                            <Select
                                defaultValue={
                                    element &&
                                    element.dropdownOptions &&
                                    element.dropdownOptions.length > 0 &&
                                    element.dropdownOptions[0]
                                }
                                style={{ width: "100%" }}
                            >
                                {element &&
                                    element.dropdownOptions &&
                                    element.dropdownOptions.length > 0 &&
                                    element.dropdownOptions.map((item, i) => (
                                        <Select.Option key={i} value={item}>
                                            {item}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            case "list":
                return (
                    <div className="relative">
                        {element.listLabel && element.listLabel.length > 0 && (
                            <Typography>{element.listLabel}</Typography>
                        )}

                        <Form.Item name={element.elementName}>
                            <List
                                dataSource={
                                    element.listOptions.length > 0 &&
                                    element.listOptions
                                }
                                style={{
                                    ...element.customStyle,
                                }}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta title={item} />
                                    </List.Item>
                                )}
                            />
                        </Form.Item>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            case "table":
                return (
                    <div className="relative border border-dashed border-slate-100">
                        <Form.Item name={element.elementName}>
                            <Table
                                key={element.id}
                                id={element.id}
                                style={{
                                    ...element.customStyle,
                                }}
                                className="my-2 w-full"
                                dataSource={element.dataSource}
                                columns={element.columns}
                                pagination={false}
                                size="small"
                            />
                        </Form.Item>
                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );

            case "image":
                return (
                    <div className="relative ">
                        {element.sourceOption === "predefined" ? (
                            <div
                                style={{
                                    ...element.customStyle,
                                }}
                            >
                                {element.imageUrls &&
                                    element.imageUrls.length > 0 &&
                                    element.imageUrls.map((img, i) => (
                                        <Image
                                            className="w-full h-full aspect-video"
                                            key={i}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                            src={img.AttachedFile}
                                            alt="uploaded image"
                                            preview={false}
                                        />
                                    ))}
                            </div>
                        ) : (
                            <Form.Item name={element.elementName}>
                                <input
                                    key="${element.id}"
                                    id="${element.id}"
                                    type="file"
                                    multiple={
                                        element.uploadOption === "multiple"
                                            ? true
                                            : false
                                    }
                                    className="my-2"
                                    style={{
                                        ...element.customStyle,
                                    }}
                                />
                            </Form.Item>
                        )}

                        <DeleteElement
                            id={element.id}
                            handleDelete={handleDelete}
                            element={element}
                            updateElementWithStyleFromDragged={
                                updateElementWithStyleFromDragged
                            }
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* <Form
                form={form}
                onFinish={onFinish}
                name="campaign_form"
                initialValues={{}}
                scrollToFirstError
            > */}
            {renderElement(element)}
            {/* </Form> */}
        </>
    );
};

export default FormElementDragged;
