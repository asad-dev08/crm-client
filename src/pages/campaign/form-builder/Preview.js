import React from "react";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
    Radio,
    Table,
    Typography,
    List,
    Image,
} from "antd";

const { Text } = Typography;
const { Option } = Select;

const gridStyle = (length, isrow) => {
    return {
        display: "grid",
        gridTemplateColumns: `repeat(${isrow ? length : 1}, minmax(0, 1fr))`,
        // gap: "16px",
        alignItems: "start",
    };
};

const Preview = ({ data }) => {
    const [form] = Form.useForm();

    const handleSaveClick = (e) => {
        e.preventDefault();
        form.submit();
    };
    const onFinish = async (values) => {
        console.log("form values:", values);
    };

    const getGeneratedCode = (element) => {
        switch (element.type) {
            case "div":
                return (
                    <div
                        id={element.id}
                        className={`relative w-full py-1 text-slate-800 `}
                        style={{
                            ...gridStyle(
                                element.children.length,
                                element.isRowWise
                            ),
                            ...element.customStyle,
                        }}
                    >
                        {element.children &&
                            element.children.map((child) =>
                                getGeneratedCode(child)
                            )}
                    </div>
                );
            case "button":
                return (
                    <>
                        <Form.Item layout="vertical">
                            <Button
                                key={element.id}
                                id={element.id}
                                type="primary"
                                htmlType="button"
                                onClick={handleSaveClick}
                                className="my-1"
                                style={{ ...element.customStyle }}
                            >
                                {element.buttonLabel}
                            </Button>
                        </Form.Item>
                    </>
                );
            case "textbox":
                return (
                    <>
                        {/* {element.textboxLabel && (
                            <Typography>{element.textboxLabel}</Typography>
                        )} */}
                        <Form.Item
                            layout="vertical"
                            label={element.textboxLabel}
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
                                className="my-2"
                                style={{ ...element.customStyle }}
                            />
                        </Form.Item>
                    </>
                );
            case "checkbox":
                return (
                    <>
                        {/* {element.checkboxLabel && (
                            <Typography>{element.checkboxLabel}</Typography>
                        )} */}
                        <Form.Item
                            layout="vertical"
                            label={element.checkboxLabel}
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
                    </>
                );
            case "radio":
                return (
                    <>
                        {/* {element.radioLabel && (
                            <Typography>{element.radioLabel}</Typography>
                        )} */}
                        <Form.Item
                            layout="vertical"
                            label={element.radioLabel}
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
                                        <Radio key={i} value={item}>
                                            {item}
                                        </Radio>
                                    ))}
                            </Radio.Group>
                        </Form.Item>
                    </>
                );
            case "label":
                return (
                    <>
                        <Text
                            key={element.id}
                            id={element.id}
                            style={{ ...element.customStyle }}
                            className="my-1"
                        >
                            {element.labelLabel}
                        </Text>
                    </>
                );
            case "dropdown":
                return (
                    <>
                        {/* {element.dropdownLabel && (
                            <Typography>{element.dropdownLabel}</Typography>
                        )} */}
                        <Form.Item
                            label={element.dropdownLabel}
                            layout="vertical"
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
                                        <Option key={i} value={item}>
                                            {item}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </>
                );
            case "list":
                return (
                    <div className="bg-slate-50 w-full relative">
                        {/* {element.listLabel && element.listLabel.length > 0 && (
                            <Typography>{element.listLabel}</Typography>
                        )} */}
                        <Form.Item
                            layout="vertical"
                            label={element.listLabel}
                            name={element.elementName}
                        >
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
                    </div>
                );
            case "table":
                return (
                    <>
                        <Form.Item layout="vertical" name={element.elementName}>
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
                    </>
                );
            case "image":
                return (
                    <>
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
                            <Form.Item
                                layout="vertical"
                                name={element.elementName}
                            >
                                <input
                                    key={element.id}
                                    id={element.id}
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
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                name="campaign_form"
                initialValues={{}}
                scrollToFirstError
                layout="vertical"
            >
                {data &&
                    data.length > 0 &&
                    data.map((element) => getGeneratedCode(element))}
            </Form>
        </div>
    );
};

export default Preview;
