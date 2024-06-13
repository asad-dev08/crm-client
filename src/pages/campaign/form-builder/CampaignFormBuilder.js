import React, { useEffect, useState } from "react";
import FormElement from "./FormElement";
import FormElementDragged from "./FormElementDragged";
import {
    Button,
    Modal,
    Input,
    Checkbox,
    Radio,
    Select,
    Typography,
    List,
    Table,
    AppBar,
    Toolbar,
} from "antd";
import { useNavigate } from "react-router";
import { CloseOutlined } from "@ant-design/icons";
import Preview from "./Preview";

const { Option } = Select;
const { Title } = Typography;

const sourceElements = [
    { id: "button1", type: "button", content: "div" },
    { id: "button1", type: "button", content: "button" },
    { id: "button3", type: "button", content: "textbox" },
    { id: "button4", type: "button", content: "checkbox" },
    { id: "button5", type: "button", content: "radio" },
    { id: "button6", type: "button", content: "label" },
    { id: "button8", type: "button", content: "dropdown" },
    { id: "button9", type: "button", content: "list" },
    { id: "button10", type: "button", content: "table" },
    { id: "button11", type: "image", content: "image" },
];

const defaultForm = [
    {
        id: "div1",
        type: "div", // Default type
        content: "div",
        uploadOption: null,
        children: [],
    },
];

const gridStyle = (length, isrow) => {
    return {
        display: "grid",
        gridTemplateColumns: `repeat(${isrow ? length : 1}, minmax(0, 1fr))`,
        gap: "16px", // Adjust as needed
        alignItems: "start",
    };
};

function CampaignFormBuilder() {
    const [items, setItems] = useState(sourceElements);
    const [draggedItem, setDraggedItem] = useState(defaultForm);
    const [temp, setTemp] = useState([]);
    const [isFind, setIsFind] = useState(false);
    const navigate = useNavigate();
    const [isSingle, setIsSingle] = useState(true);

    // for table
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [newTableElement, setNewTableElement] = useState(null);
    const [tableColumns, setTableColumns] = useState([]);
    const [targetContainerId, setTargetContainerId] = useState(null);
    const [tableRows, setTableRows] = useState([]);

    // for image

    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [newImageElement, setNewImageElement] = useState(null);
    const [imageUploadOption, setImageUploadOption] = useState("single");
    const [imageSourceOption, setImageSourceOption] = useState("user");
    const [predefinedImageUrls, setPredefinedImageUrls] = useState([]);

    //for dropdown

    const [isDropdownModalVisible, setIsDropdownModalVisible] = useState(false);
    const [newDropdownElement, setNewDropdownElement] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownLabel, setDropdownLabel] = useState("");

    //for radio

    const [isRadioModalVisible, setIsRadioModalVisible] = useState(false);
    const [newRadioElement, setNewRadioElement] = useState(null);
    const [radioOptions, setRadioOptions] = useState([]);
    const [radioLabel, setRadioLabel] = useState("");

    //for checkbox

    const [isCheckboxModalVisible, setIsCheckboxModalVisible] = useState(false);
    const [newCheckboxElement, setNewCheckboxElement] = useState(null);
    const [checkboxOptions, setCheckboxOptions] = useState([]);
    const [checkboxLabel, setCheckboxLabel] = useState("");
    //for list

    const [isListModalVisible, setIsListModalVisible] = useState(false);
    const [newListElement, setNewListElement] = useState(null);
    const [listOptions, setListOptions] = useState([]);
    const [listLabel, setListLabel] = useState("");

    //for button

    const [isButtonModalVisible, setIsButtonModalVisible] = useState(false);
    const [newButtonElement, setNewButtonElement] = useState(null);
    const [buttonLabel, setButtonLabel] = useState("");

    //for textbox

    const [isTextBoxModalVisible, setIsTextBoxModalVisible] = useState(false);
    const [newTextBoxElement, setNewTextBoxElement] = useState(null);
    const [textboxLabel, setTextBoxLabel] = useState("");
    const [textboxPlaceholder, setTextBoxPlaceholder] = useState("");
    const [textboxType, setTextBoxType] = useState("");

    //for button

    const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
    const [newLabelElement, setNewLabelElement] = useState(null);
    const [labelLabel, setLabelLabel] = useState("");

    const [elementName, setElementName] = useState("");
    const [requiredMessage, setRequiredMessage] = useState("");
    const [isRequired, setIsRequired] = useState(false);

    const handleListSubmit = () => {
        if (newListElement) {
            const updatedElement = {
                ...newListElement,
                label: listLabel,
                options: listOptions,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsListModalVisible(false);
            setNewListElement(null);
            setListOptions([]);
            setListLabel("");
            setTargetContainerId(null);
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const handleRadioSubmit = () => {
        if (newRadioElement) {
            const updatedElement = {
                ...newRadioElement,
                label: radioLabel,
                options: radioOptions,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsRadioModalVisible(false);
            setNewRadioElement(null);
            setRadioOptions([]);
            setRadioLabel("");
            setTargetContainerId(null);
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const handleCheckboxSubmit = () => {
        if (newCheckboxElement) {
            const updatedElement = {
                ...newCheckboxElement,
                label: checkboxLabel,
                options: checkboxOptions,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsCheckboxModalVisible(false);
            setNewCheckboxElement(null);
            setCheckboxOptions([]);
            setCheckboxLabel("");
            setTargetContainerId(null);
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const handleButtonSubmit = () => {
        if (newButtonElement) {
            const updatedElement = {
                ...newButtonElement,
                label: buttonLabel,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsButtonModalVisible(false);
            setNewButtonElement(null);
            setButtonLabel("");
            setTargetContainerId(null);
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const handleLabelSubmit = () => {
        if (newLabelElement) {
            const updatedElement = {
                ...newLabelElement,
                label: buttonLabel,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsLabelModalVisible(false);
            setNewLabelElement(null);
            setLabelLabel("");
            setTargetContainerId(null);
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const handleTextBoxSubmit = () => {
        if (newTextBoxElement) {
            const updatedElement = {
                ...newTextBoxElement,
                label: textboxLabel,
                type: textboxType,
                placeholder: textboxPlaceholder,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsTextBoxModalVisible(false);
            setNewTextBoxElement(null);
            setTextBoxLabel("");
            setTargetContainerId(null);
            setTextBoxPlaceholder("");
            setTextBoxType("");
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const handleDropdownSubmit = () => {
        if (newDropdownElement) {
            const updatedElement = {
                ...newDropdownElement,
                label: dropdownLabel,
                options: dropdownOptions,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsDropdownModalVisible(false);
            setNewDropdownElement(null);
            setDropdownOptions([]);
            setDropdownLabel("");
            setTargetContainerId(null);
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const handleImageSubmit = () => {
        if (newImageElement) {
            const updatedElement = {
                ...newImageElement,
                uploadOption: imageUploadOption,
                sourceOption: imageSourceOption,
                imageUrls: predefinedImageUrls,
            };

            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsImageModalVisible(false);
            setNewImageElement(null);
            setImageUploadOption("single");
            setImageSourceOption("user");
            setPredefinedImageUrls([]);
            setTargetContainerId(null);
            setElementName("");
            setIsRequired(false);
            setRequiredMessage("");
        }
    };

    const addRow = () => {
        const newRow = tableColumns.reduce((acc, col) => {
            acc[col.toLowerCase()] = "";
            return acc;
        }, {});
        setTableRows([...tableRows, newRow]);
    };

    const handleRowDataChange = (e, colIndex, rowIndex) => {
        const newData = [...tableRows];
        const columnName = tableColumns[colIndex].toLowerCase();
        if (!newData[rowIndex]) {
            newData[rowIndex] = {};
        }
        newData[rowIndex][columnName] = e.target.value;
        setTableRows(newData);
    };
    const handleTableDataSubmit = () => {
        if (newTableElement) {
            const columns = tableColumns.map((name) => ({
                title: name,
                dataIndex: name.toLowerCase(),
                key: name.toLowerCase(),
            }));

            const updatedElement = {
                ...newTableElement,
                columns,
                dataSource: tableRows,
            };

            // Add the new table element to the target container
            setDraggedItem((prevDraggedItem) => {
                return updateChildrenInArray(
                    targetContainerId,
                    prevDraggedItem,
                    updatedElement,
                    1
                );
            });

            setIsTableModalVisible(false);
            setNewTableElement(null);
            setTableColumns([]);
            setTableRows([]);
            setTargetContainerId(null);
        }
    };

    const handleDragStart = (e, element) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(element));
    };

    const generateRandomId = (type) => {
        return `${type}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const doesItemIdExistInArray = (id, items) => {
        let isFound = false;
        for (const item of items) {
            if (item.id === id && item.type === "div") {
                isFound = true;
                break;
            }
            if (
                item.children.length > 0 &&
                doesItemIdExistInArray(id, item.children)
            ) {
                isFound = true;
                break;
            }
        }
        return isFound;
    };

    const updateChildrenInArray = (
        id,
        items,
        element,
        columnsToPush,
        uploadOption = "single"
    ) => {
        return items.map((item) => {
            if (item.id === id && item.type === "div") {
                let updatedChildren = [];

                if (element.content === "div") {
                    updatedChildren = [
                        {
                            id: generateRandomId("div"),
                            type: "div",
                            content: "div",
                            children: [],
                            uploadOption: imageUploadOption,
                            columns: element.columns || undefined,
                            dataSource: element.dataSource || undefined,

                            uploadOption: imageUploadOption,
                            sourceOption: imageSourceOption,
                            imageUrls: predefinedImageUrls,
                            dropdownOptions: dropdownOptions,
                            dropdownLabel: dropdownLabel,
                            listOptions: listOptions,
                            listLabel: listLabel,
                            radioOptions: radioOptions,
                            radioLabel: radioLabel,
                            buttonLabel: buttonLabel,
                            textboxLabel: textboxLabel,
                            textboxType: textboxType,
                            textboxPlaceholder: textboxPlaceholder,
                            checkboxOptions: checkboxOptions,
                            checkboxLabel: checkboxLabel,
                            labelLabel: labelLabel,

                            elementName: elementName,
                            isRequired: isRequired,
                            requiredMessage: requiredMessage,
                            isRowWise: true,
                        },
                    ];

                    for (let i = 0; i < columnsToPush; i++) {
                        updatedChildren[0].children.push({
                            id: generateRandomId(element.content),
                            type: element.content,
                            content: element.content,
                            uploadOption: imageUploadOption,
                            columns: element.columns || undefined,
                            dataSource: element.dataSource || undefined,

                            uploadOption: imageUploadOption,
                            sourceOption: imageSourceOption,
                            imageUrls: predefinedImageUrls,
                            dropdownOptions: dropdownOptions,
                            dropdownLabel: dropdownLabel,
                            listOptions: listOptions,
                            listLabel: listLabel,
                            radioOptions: radioOptions,
                            radioLabel: radioLabel,
                            buttonLabel: buttonLabel,
                            textboxLabel: textboxLabel,
                            textboxType: textboxType,
                            textboxPlaceholder: textboxPlaceholder,
                            checkboxOptions: checkboxOptions,
                            checkboxLabel: checkboxLabel,
                            labelLabel: labelLabel,

                            elementName: elementName,
                            isRequired: isRequired,
                            requiredMessage: requiredMessage,
                            children: [],
                        });
                    }
                    return {
                        ...item,
                        children: [...item.children, ...updatedChildren],
                    };
                } else {
                    return {
                        ...item,
                        children: [
                            ...item.children,
                            {
                                id: generateRandomId(element.content),
                                type: element.content,
                                content: element.content,
                                uploadOption: imageUploadOption,
                                columns: element.columns || undefined,
                                dataSource: element.dataSource || undefined,

                                uploadOption: imageUploadOption,
                                sourceOption: imageSourceOption,
                                imageUrls: predefinedImageUrls,
                                dropdownOptions: dropdownOptions,
                                dropdownLabel: dropdownLabel,
                                listOptions: listOptions,
                                listLabel: listLabel,
                                radioOptions: radioOptions,
                                radioLabel: radioLabel,
                                buttonLabel: buttonLabel,
                                textboxLabel: textboxLabel,
                                textboxType: textboxType,
                                textboxPlaceholder: textboxPlaceholder,
                                checkboxOptions: checkboxOptions,
                                checkboxLabel: checkboxLabel,
                                labelLabel: labelLabel,

                                elementName: elementName,
                                isRequired: isRequired,
                                requiredMessage: requiredMessage,
                                children: [],
                            },
                        ],
                    };
                }
            }
            if (item.children.length > 0) {
                return {
                    ...item,
                    children: updateChildrenInArray(
                        id,
                        item.children,
                        element,
                        columnsToPush
                    ),
                };
            }

            return item;
        });
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        e.stopPropagation();
        const draggedElement = JSON.parse(e.dataTransfer.getData("text/plain"));

        let columnsToPush = 1;
        let isTargetDiv = doesItemIdExistInArray(targetId, draggedItem);

        if (draggedElement.content === "table") {
            setIsTableModalVisible(true);
            setNewTableElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }

        if (draggedElement.content === "image") {
            setIsImageModalVisible(true);
            setNewImageElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }
        if (draggedElement.content === "dropdown") {
            setIsDropdownModalVisible(true);
            setNewDropdownElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }
        if (draggedElement.content === "radio") {
            setIsRadioModalVisible(true);
            setNewRadioElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }
        if (draggedElement.content === "checkbox") {
            setIsCheckboxModalVisible(true);
            setNewCheckboxElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }
        if (draggedElement.content === "button") {
            setIsButtonModalVisible(true);
            setNewButtonElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }
        if (draggedElement.content === "label") {
            setIsLabelModalVisible(true);
            setNewLabelElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }
        if (draggedElement.content === "textbox") {
            setIsTextBoxModalVisible(true);
            setNewTextBoxElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }
        if (draggedElement.content === "list") {
            setIsListModalVisible(true);
            setNewListElement({
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
            });
            setTargetContainerId(targetId);
            return;
        }

        if (isTargetDiv) {
            if (draggedElement.content === "div") {
                columnsToPush = prompt(
                    "Enter the number of columns to push:",
                    "1"
                );
            }

            if (
                columnsToPush !== null &&
                !isNaN(columnsToPush) &&
                parseInt(columnsToPush) > 0
            ) {
                const updatedForm = updateChildrenInArray(
                    targetId,
                    draggedItem,
                    draggedElement,
                    parseInt(columnsToPush)
                    //imgOption
                );

                setIsFind(true);
                setTemp(updatedForm);
                setDraggedItem([...updatedForm]);
            }
        } else {
            // Create a new object and append to defaultForm
            const newObject = {
                id: generateRandomId(draggedElement.content),
                type: draggedElement.content,
                content: draggedElement.content,
                uploadOption:
                    draggedElement.content === "image" && isSingle
                        ? "single"
                        : "multiple",
            };
            setDraggedItem([...defaultForm, newObject]);
        }
    };
    console.log("eles: ", draggedItem);
    const deleteElementFromDraggedItems = (draggedItem, id) => {
        for (let i = 0; i < draggedItem.length; i++) {
            if (draggedItem[i].id === id) {
                draggedItem.splice(i, 1);
                return true;
            }
            if (draggedItem[i].children) {
                if (
                    deleteElementFromDraggedItems(draggedItem[i].children, id)
                ) {
                    return true;
                }
            }
        }
    };

    const setStyleOfElements = (id, items, styleObj) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                // Add the new property to the object
                items[i].customStyle = styleObj;
                return true; // Object found and updated
            }

            if (items[i].children.length > 0) {
                const childResult = setStyleOfElements(
                    id,
                    items[i].children,
                    styleObj
                );
                if (childResult) {
                    return true; // Object found and updated in a child level
                }
            }
        }
        return false;
    };

    const updateElementWithStyle = (id, styleObj) => {
        const newData = [...draggedItem];
        const isSet = setStyleOfElements(id, newData, styleObj);
        if (isSet) {
            setDraggedItem(newData);
        }
    };

    function handleDeleteElement(e, id) {
        e.preventDefault();
        const newData = [...draggedItem];
        const isRemoved = deleteElementFromDraggedItems(newData, id);
        if (isRemoved) {
            setDraggedItem(newData);
        }
    }

    const getGeneratedCode = (element) => {
        switch (element.type) {
            case "div":
                return `
        <div
          id="${element.id}"
          className="relative w-full px-2 pt-4 pb-6 my-2 text-slate-800 "
          style={{
            ${JSON.stringify(
                gridStyle(element.children.length, element.isRowWise)
            )},
            ${JSON.stringify(element.customStyle)},
          }}
        >
          ${
              element.children &&
              element.children.map(getGeneratedCode).join("\n")
          }
        </div>`;
            case "button":
                return `
        <div className="relative ">
          <Button
            key="${element.id}"
            id="${element.id}"
            type="primary"
            className="my-2"
            style={${JSON.stringify(element.customStyle)}}
          >
            ${element.content}
          </Button>
        </div>`;
            case "textbox":
                return `
        <div className="relative  ">
          <Input
            type="text"
            key="${element.id}"
            id="${element.id}"
            placeholder="Enter something..."
            label="${element.content}"
            fullWidth
            className="my-2 border outline-none px-4 py-2 text-sm rounded-md w-full"
          />
        </div>`;
            case "checkbox":
                return `
        <div className="relative  ">
          <Checkbox.Group id="${element.id}">
            <Checkbox value="Option 1">Option 1</Checkbox>
            <Checkbox value="Option 2">Option 2</Checkbox>
          </Checkbox.Group>
        </div>`;
            case "radio":
                return `
        <div className="relative  ">
          <Radio.Group id="${element.id}" defaultValue="female" style={{marginBottom:0}}>
            <Radio value="female">Female</Radio>
            <Radio value="male">Male</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </div>`;
            case "label":
                return `
        <div className="relative ">
          <Typography
            key="${element.id}"
            id="${element.id}"
            style={${JSON.stringify(element.customStyle)}}
            className="my-2"
          >
            Label
          </Typography>
        </div>`;
            case "heading":
                return `
        <div className="relative ">
          <Title
            key="${element.id}"
            id="${element.id}"
            level={4}
            className="my-2"
          >
            Heading
          </Title>
        </div>`;
            case "dropdown":
                return `
        <div className="relative ">
          <Select
            id="${element.id}"
            defaultValue={20}
            className="w-full"
            onChange={() => {}}
          >
            <Option value={10}>Ten</Option>
            <Option value={20}>Twenty</Option>
            <Option value={30}>Thirty</Option>
          </Select>
        </div>`;
            case "list":
                return `
        <div className="bg-slate-50 w-full relative ">
          <List id="${element.id}">
            <List.Item>
              <List.Item.Meta title="Item 1" />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Item 2" />
            </List.Item>
          </List>
        </div>`;
            case "table":
                return `
        <div className="relative ">
          <Table
            size="small"
            key="${element.id}"
            id="${element.id}"
            className="my-2 w-full"
            columns={[
              { title: 'State', dataIndex: 'state', key: 'state' },
              { title: 'City', dataIndex: 'city', key: 'city' },
            ]}
            dataSource={[
              { key: '1', state: 'Indiana', city: 'Indianapolis' },
              { key: '2', state: 'Ohio', city: 'Columbus' },
            ]}
          />
        </div>`;
            case "image":
                return `
          <div className="relative ">
            <input
              key="${element.id}"
              id="${element.id}"
              type="file"
              multiple={${element.uploadOption} === "multiple" ? true : false}
              className="my-2"
            />
          </div>`;
            default:
                return "";
        }
    };

    const handleDownlaod = (e) => {
        e.preventDefault();
        const code = draggedItem.map(getGeneratedCode).join("\n");

        const element = document.createElement("a");
        const file = new Blob([code], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "generated_code.txt";
        element.click();
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTableModalCancel = () => {
        setIsTableModalVisible(false);
        setNewTableElement(null);
        setTableColumns([]);
        setTableRows([]);
        setTargetContainerId(null);
    };

    const handleImageModalCancel = () => {
        setIsImageModalVisible(false);
        setNewImageElement(null);
        setImageUploadOption("single");
        setImageSourceOption("user");
        setPredefinedImageUrls([]);
        setTargetContainerId(null);
    };

    const handleImageUpload = (files) => {
        if (!files[0]) {
            return;
        }
        // let tmpAtc = [...form.Attachments];
        let tmpAtc = [];
        var reader = new FileReader();
        function readFile(index) {
            if (index >= files.length) return;
            var file = files[index];
            reader.onload = function (e) {
                // get file content
                var bin = e.target.result;
                // do sth with bin
                const obj = {
                    AID: Math.random(),
                    AttachedFile: `data:${files[index].type};base64,${btoa(
                        bin
                    )}`,
                    Type: files[index].type,
                    OriginalName: files[index].name,
                    Size: files[index].size * 0.001,
                    FilePath: "",
                };
                tmpAtc.push(obj);
                setPredefinedImageUrls(tmpAtc);
                readFile(index + 1);
            };
            reader.readAsBinaryString(file);
        }
        readFile(0);
    };

    const handleSave = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="p-4 flex items-start justify-between gap-4">
                <div className="w-full mr-[300px]">
                    <div className="flex items-center justify-between flex-col lg:flex-row">
                        <div className="flex items-center gap-4">
                            <Button onClick={handleClickOpen}>Preview</Button>
                            <Button onClick={(e) => handleSave(e)}>Save</Button>
                            {/* <Button type="primary" onClick={(e) => handleDownlaod(e)}>
                  Download Code
                </Button> */}
                        </div>
                    </div>
                    <div>
                        {draggedItem.map((element) => (
                            <>
                                <FormElementDragged
                                    element={element}
                                    handleDeleteEL={handleDeleteElement}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    handleDrop={handleDrop}
                                    updateElementWithStyle={
                                        updateElementWithStyle
                                    }
                                />
                            </>
                        ))}
                    </div>
                </div>
                <div className="fixed right-0 top-0 bottom-0 max-w-[300px] w-[300px] bg-white p-4 overflow-y-auto shadow-lg">
                    <Title level={4}>Element List</Title>
                    <div className="grid grid-cols-2 gap-4">
                        {sourceElements.map((element) => (
                            <div
                                key={element.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, element)}
                            >
                                <FormElement element={element} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                width="100%"
                title="Preview"
                maskClosable={false}
                visible={open}
                onOk={handleClose}
                onCancel={handleClose}
            >
                <Preview data={draggedItem} />
            </Modal>

            {/* Modal for table */}
            <Modal
                width="700px"
                title="Enter Table Data"
                visible={isTableModalVisible}
                onOk={handleTableDataSubmit}
                onCancel={handleTableModalCancel}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <Input
                    placeholder="Column names (comma separated)"
                    autoFocus
                    onChange={(e) => setTableColumns(e.target.value.split(","))}
                />
                <div className="flex items-center gap-3">
                    <Title level={5}> Columns: {tableColumns.join(", ")}</Title>
                </div>

                <Button onClick={addRow} className="my-1">
                    Add Row
                </Button>
                <div className="w-full my-1">
                    {tableRows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex items-center gap-2 flex-col md:flex-row my-1"
                        >
                            {tableColumns.map((col, colIndex) => (
                                <Input
                                    key={colIndex}
                                    placeholder={`Enter data for ${col}`}
                                    value={row[col.toLowerCase()] || ""}
                                    onChange={(e) =>
                                        handleRowDataChange(
                                            e,
                                            colIndex,
                                            rowIndex
                                        )
                                    }
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </Modal>
            {/* Modal for Image */}
            <Modal
                title="Add Image"
                visible={isImageModalVisible}
                onCancel={handleImageModalCancel}
                onOk={handleImageSubmit}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="single"
                            checked={imageUploadOption === "single"}
                            onChange={(e) =>
                                setImageUploadOption(e.target.value)
                            }
                        />
                        Single Image
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="multiple"
                            checked={imageUploadOption === "multiple"}
                            onChange={(e) =>
                                setImageUploadOption(e.target.value)
                            }
                        />
                        Multiple Images
                    </label>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="user"
                            checked={imageSourceOption === "user"}
                            onChange={(e) =>
                                setImageSourceOption(e.target.value)
                            }
                        />
                        User Upload
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="predefined"
                            checked={imageSourceOption === "predefined"}
                            onChange={(e) =>
                                setImageSourceOption(e.target.value)
                            }
                        />
                        Predefined Image
                    </label>
                </div>
                {imageSourceOption === "predefined" && (
                    <div>
                        <label>
                            Predefined Image URLs (comma separated):
                            <Input
                                type="file"
                                multiple={imageUploadOption === "multiple"}
                                onChange={(e) => {
                                    handleImageUpload(e.target.files);
                                }}
                                style={{ marginTop: "8px" }}
                            />
                        </label>
                    </div>
                )}
            </Modal>

            {/* Modal for Dropdown */}
            <Modal
                title="Configure Dropdown"
                visible={isDropdownModalVisible}
                onOk={handleDropdownSubmit}
                onCancel={() => setIsDropdownModalVisible(false)}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div>
                    <label>
                        Label:
                        <Input
                            value={dropdownLabel}
                            onChange={(e) => setDropdownLabel(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Options (comma separated):
                        <Input
                            value={dropdownOptions.join(",")}
                            onChange={(e) =>
                                setDropdownOptions(e.target.value.split(","))
                            }
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label>
                        Required?:
                        <Checkbox
                            value={isRequired}
                            onChange={(e) => setIsRequired(e.target.checked)}
                        />
                    </label>
                    <label>
                        Required Message:
                        <Input
                            value={requiredMessage}
                            onChange={(e) => setRequiredMessage(e.target.value)}
                        />
                    </label>
                </div>
            </Modal>

            {/* Modal for List */}
            <Modal
                title="Configure List"
                visible={isListModalVisible}
                onOk={handleListSubmit}
                onCancel={() => setIsListModalVisible(false)}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div>
                    <label>
                        Label:
                        <Input
                            value={listLabel}
                            onChange={(e) => setListLabel(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Options (comma separated):
                        <Input
                            value={listOptions.join(",")}
                            onChange={(e) =>
                                setListOptions(e.target.value.split(","))
                            }
                        />
                    </label>
                </div>
            </Modal>

            {/* Modal for Radio */}
            <Modal
                title="Configure Radio"
                visible={isRadioModalVisible}
                onOk={handleRadioSubmit}
                onCancel={() => setIsRadioModalVisible(false)}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div>
                    <label>
                        Label:
                        <Input
                            value={radioLabel}
                            onChange={(e) => setRadioLabel(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Options (comma separated):
                        <Input
                            value={radioOptions.join(",")}
                            onChange={(e) =>
                                setRadioOptions(e.target.value.split(","))
                            }
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label>
                        Required?:
                        <Checkbox
                            value={isRequired}
                            onChange={(e) => setIsRequired(e.target.checked)}
                        />
                    </label>
                    <label>
                        Required Message:
                        <Input
                            value={requiredMessage}
                            onChange={(e) => setRequiredMessage(e.target.value)}
                        />
                    </label>
                </div>
            </Modal>

            {/* Modal for Checkbox */}
            <Modal
                title="Configure Checkbox"
                visible={isCheckboxModalVisible}
                onOk={handleCheckboxSubmit}
                onCancel={() => setIsCheckboxModalVisible(false)}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div>
                    <label>
                        Label:
                        <Input
                            value={checkboxLabel}
                            onChange={(e) => setCheckboxLabel(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Options (comma separated):
                        <Input
                            value={checkboxOptions.join(",")}
                            onChange={(e) =>
                                setCheckboxOptions(e.target.value.split(","))
                            }
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label>
                        Required?:
                        <Checkbox
                            value={isRequired}
                            onChange={(e) => setIsRequired(e.target.checked)}
                        />
                    </label>
                    <label>
                        Required Message:
                        <Input
                            value={requiredMessage}
                            onChange={(e) => setRequiredMessage(e.target.value)}
                        />
                    </label>
                </div>
            </Modal>
            {/* Modal for Button */}
            <Modal
                title="Configure Button"
                visible={isButtonModalVisible}
                onOk={handleButtonSubmit}
                onCancel={() => setIsButtonModalVisible(false)}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div>
                    <label>
                        Label:
                        <Input
                            value={buttonLabel}
                            onChange={(e) => setButtonLabel(e.target.value)}
                        />
                    </label>
                </div>
            </Modal>
            {/* Modal for TextBox */}
            <Modal
                title="Configure TextBox"
                visible={isTextBoxModalVisible}
                onOk={handleTextBoxSubmit}
                onCancel={() => setIsTextBoxModalVisible(false)}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div className="flex flex-col gap-3">
                    <label>
                        Label:
                        <Input
                            value={textboxLabel}
                            onChange={(e) => setTextBoxLabel(e.target.value)}
                        />
                    </label>
                    <label>
                        Type:
                        <Input
                            value={textboxType}
                            onChange={(e) => setTextBoxType(e.target.value)}
                        />
                    </label>
                    <label>
                        Placeholder:
                        <Input
                            value={textboxPlaceholder}
                            onChange={(e) =>
                                setTextBoxPlaceholder(e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Required?:
                        <Checkbox
                            value={isRequired}
                            onChange={(e) => setIsRequired(e.target.checked)}
                        />
                    </label>
                    <label>
                        Required Message:
                        <Input
                            value={requiredMessage}
                            onChange={(e) => setRequiredMessage(e.target.value)}
                        />
                    </label>
                </div>
            </Modal>

            {/* Modal for Label */}
            <Modal
                title="Configure Label"
                visible={isLabelModalVisible}
                onOk={handleLabelSubmit}
                onCancel={() => setIsLabelModalVisible(false)}
            >
                <label className="mb-2">
                    Element Name(IT'S MANDATORY TO GIVE THE NAME WITHOUT SPACE):
                    <Input
                        type="text"
                        onChange={(e) => {
                            setElementName(e.target.value);
                        }}
                        placeholder="Enter the name of element "
                        style={{ marginBottom: "10px" }}
                    />
                </label>
                <div>
                    <label>
                        Label:
                        <Input
                            value={labelLabel}
                            onChange={(e) => setLabelLabel(e.target.value)}
                        />
                    </label>
                </div>
            </Modal>
        </>
    );
}

export default CampaignFormBuilder;
