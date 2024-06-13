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
        gap: "16px",
        alignItems: "start",
    };
};

export const getGeneratedCode = (element, handleSaveClick) => {
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
                    {element.children && element.children.map(getGeneratedCode)}
                </div>
            );
        case "button":
            return (
                <div className="relative">
                    <Form.Item>
                        <Button
                            key={element.id}
                            id={element.id}
                            type="primary"
                            htmlType="button"
                            onClick={() => handleSaveClick()}
                            className="my-1"
                            style={{ ...element.customStyle }}
                        >
                            {element.buttonLabel}
                        </Button>
                    </Form.Item>
                </div>
            );
        case "textbox":
            return (
                <div className="relative">
                    {element.textboxLabel && (
                        <Typography>{element.textboxLabel}</Typography>
                    )}
                    <Form.Item
                        name={element.elementName}
                        rules={[
                            {
                                required: !!element.isTextBoxRequired,
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
                </div>
            );
        case "checkbox":
            return (
                <div className="relative">
                    {element.checkboxLabel && (
                        <Typography>{element.checkboxLabel}</Typography>
                    )}
                    <Form.Item
                        name={element.elementName}
                        id={element.id}
                        style={{
                            ...element.customStyle,
                        }}
                    >
                        <Checkbox.Group options={element.checkboxOptions} />
                    </Form.Item>
                </div>
            );
        case "radio":
            return (
                <div className="relative">
                    {element.radioLabel && (
                        <Typography>{element.radioLabel}</Typography>
                    )}
                    <Form.Item
                        id={element.id}
                        name={element.elementName}
                        style={{
                            ...element.customStyle,
                        }}
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
                </div>
            );
        case "label":
            return (
                <div className="relative">
                    <Text
                        key={element.id}
                        id={element.id}
                        style={{ ...element.customStyle }}
                        className="my-1"
                    >
                        {element.labelLabel}
                    </Text>
                </div>
            );

        case "dropdown":
            return (
                <div className="relative">
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
                </div>
            );
        case "list":
            return (
                <div className="bg-slate-50 w-full relative">
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
                </div>
            );
        case "table":
            return (
                <div className="relative">
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
                </div>
            );
        default:
            return null;
    }
};
