import React, { useEffect, useState } from "react";
import PaginatedDataGrid from "../../../components/theme/global/datagrid/PaginatedDataGrid";
import SecurityRuleListHeader from "./SecurityRuleListHeader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteSecurityRule,
  getSecurityRule,
  getSecurityRulesWithPagination,
} from "../../../redux/security-rule/securityRuleSlice";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import {
  MdDeleteOutline,
  MdMoreVert,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import toast from "react-hot-toast";
import CreateSecurityRule from "../create-security-rule/CreateSecurityRule";
import { getMenus } from "../../../redux/menu/menuSlice";
import { getPermissionsForMenu } from "../../../util/helper";

const SecurityRuleList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const menus = useSelector((state) => state.menu.menus);
  const menusPermission = useSelector((state) => state.auth.menus);

  const permission = getPermissionsForMenu(
    menusPermission,
    location && location.pathname
  );

  useEffect(() => {
    dispatch(getMenus());
  }, []);

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
      {permission && permission.can_update ? (
        <Menu.Item key="edit">
          <div className="flex items-center gap-2">
            <MdOutlineModeEdit /> Edit
          </div>
        </Menu.Item>
      ) : null}
      {permission && permission.can_delete ? (
        <Menu.Item key="delete" onClick={(e) => showDeleteModal(e, row)}>
          <div className="flex items-center gap-2">
            <MdDeleteOutline />
            Delete
          </div>
        </Menu.Item>
      ) : null}
      {permission && permission.can_view ? (
        <Menu.Item key="view">
          <div className="flex items-center gap-2">
            <MdOutlineRemoveRedEye />
            View
          </div>
        </Menu.Item>
      ) : null}
    </Menu>
  );
  const handleMenuClick = async (e, row) => {
    if (e.key === "edit") {
      const response = await dispatch(getSecurityRule(row.id));
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
    const response = await dispatch(deleteSecurityRule(selectedRow.id));
    if (response) {
      toast.success("SecurityRule deleted", { duration: 3000 });
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
      getSecurityRulesWithPagination({
        tableName: "security-rule",
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
      <SecurityRuleListHeader
        showDrawer={showDrawer}
        setIsAdd={setAddOrEdit}
        permission={permission}
      />
      <PaginatedDataGrid
        columns={columns}
        fetchData={fetchData}
        cellFormatting={cellFormatting}
        dataManipulator={manipulateData}
      />
      {open && (
        <CreateSecurityRule
          onClose={onClose}
          open={open}
          data={selectedRow}
          isAdd={isAdd}
          menus={menus}
        />
      )}
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        maskClosable={false}
      >
        <p>Are you sure you want to delete this security rule?</p>
      </Modal>
    </Card>
  );
};

export default SecurityRuleList;
