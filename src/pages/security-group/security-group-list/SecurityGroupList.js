import React, { useEffect, useState } from "react";
import PaginatedDataGrid from "../../../components/theme/global/datagrid/PaginatedDataGrid";
import SecurityGroupListHeader from "./SecurityGroupListHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSecurityGroup,
  getSecurityGroup,
  getSecurityGroupsWithPagination,
} from "../../../redux/security-group/securityGroupSlice";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { MdMoreVert } from "react-icons/md";
import toast from "react-hot-toast";
import { getMenus } from "../../../redux/menu/menuSlice";
import CreateSecurityGroup from "../create-group-group/CreateSecurityGroup";

const SecurityGroupList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const setAddOrEdit = (data) => {
    setIsAdd(data);
    if (data === true) setSelectedRow(null);
  };

  const onClose = () => {
    setOpen(false);
  };
  const getMenu = (row) => (
    <Menu onClick={(e) => handleMenuClick(e, row)}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete" onClick={(e) => showDeleteModal(e, row)}>
        Delete
      </Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
    </Menu>
  );
  const handleMenuClick = async (e, row) => {
    if (e.key === "edit") {
      const response = await dispatch(getSecurityGroup(row.id));
      const data =
        (await response) && response.payload && response.payload.data;
      setSelectedRow(data);
      showDrawer();
      setIsAdd(false);
    }
  };

  const showDeleteModal = (e, row) => {
    setSelectedRow(row);
    setDeleteModalVisible(true);
  };
  const handleDeleteModalOk = async () => {
    // Perform delete action
    const response = await dispatch(deleteSecurityGroup(selectedRow.id));
    if (response) {
      toast.success("SecurityGroup deleted", { duration: 3000 });
      setDeleteStatus(true); // Trigger data refetch
      setDeleteModalVisible(false); // Close the modal
    }
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false); // Close the modal
  };

  const columns = [
    { columnName: "name", columnShow: "name" },
    { columnName: "description", columnShow: "description" },
    {
      columnName: "actions",
      columnShow: "Actions",
      render: (row) => (
        <Dropdown
          overlay={getMenu(row)}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button icon={<MdMoreVert />} />
        </Dropdown>
      ),
    },
  ];
  const cellFormatting = {
    name: {
      textAlign: "left",
    },
    description: {
      textAlign: "left",
    },
    actions: {
      width: "100px",
      textAlign: "center",
    },
  };
  const manipulateData = (data) => {
    // Perform data manipulation here
    return data.map((item) => ({
      ...item,
    }));
  };
  const fetchData = async (page = 0, pageSize = 0) => {
    const response = await dispatch(
      getSecurityGroupsWithPagination({
        tableName: "security-group",
        page: page,
        pageSize: pageSize,
      })
    );

    const data = (await response.payload) && response.payload.data;
    return {
      data: (data && data.rows) || [],

      total: (data && data.total.total) || 0,
    };
  };
  useEffect(() => {
    if (deleteStatus) {
      fetchData(1); // Fetch data again after deletion
      setDeleteStatus(false); // Reset delete status
    }
  }, [deleteStatus]);
  return (
    <Card>
      <SecurityGroupListHeader
        showDrawer={showDrawer}
        setIsAdd={setAddOrEdit}
      />
      <PaginatedDataGrid
        columns={columns}
        fetchData={fetchData}
        cellFormatting={cellFormatting}
        dataManipulator={manipulateData}
      />
      {open && (
        <CreateSecurityGroup
          onClose={onClose}
          open={open}
          data={selectedRow}
          isAdd={isAdd}
        />
      )}
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        maskClosable={false}
      >
        <p>Are you sure you want to delete this security group?</p>
      </Modal>
    </Card>
  );
};

export default SecurityGroupList;
