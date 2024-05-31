import React, { useEffect, useState } from "react";
import PaginatedDataGrid from "../../../components/theme/global/datagrid/PaginatedDataGrid";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteLeadSource,
  getLeadSource,
  getLeadSourcesWithPagination,
} from "../../../redux/lead/leadSourceSlice";
import { Button, Dropdown, Menu, Modal } from "antd";
import {
  MdDeleteOutline,
  MdMoreVert,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import toast from "react-hot-toast";
import { getPermissionsForMenu } from "../../../util/helper";
import SourceListHeader from "./SourceListHeader";
import CreateSource from "../create-source/CreateSource";

const SourceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const menus = useSelector((state) => state.auth.menus);

  const permission = getPermissionsForMenu(
    menus,
    location && location.pathname
  );

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
      const response = await dispatch(getLeadSource(row.id));
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
    const response = await dispatch(deleteLeadSource(selectedRow.id));
    if (response) {
      toast.success("LeadSource deleted", { duration: 3000 });
      setDeleteStatus(true); // Trigger data refetch
      setDeleteModalVisible(false); // Close the modal
    }
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false); // Close the modal
  };

  const columns = [
    { columnName: "name", columnShow: "name" },
    { columnName: "is_active", columnShow: "status" },
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
    template_name: {
      textAlign: "left",
    },
    event_name: {
      textAlign: "left",
    },
    is_active: {
      render: (value) =>
        value === "Active" ? (
          <p className="text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1 max-w-min">
            Active
          </p>
        ) : (
          <p className="text-red-600 bg-red-50 rounded-lg px-2 py-1 max-w-min">
            Inactive
          </p>
        ),
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
      is_active: item.is_active ? "Active" : "Inactive",
    }));
  };
  const fetchData = async (page = 0, pageSize = 0) => {
    const response = await dispatch(
      getLeadSourcesWithPagination({
        tableName: "lead_source",
        page: page,
        pageSize: pageSize,
      })
    );

    const data = (await response.payload) && response.payload.data;
    return {
      data: (data && data.rows) || [],

      total: (data && data.total.total) || 0,
      // totalPages: (data && Math.ceil(data.total.total / rowsPerPage)) || 0,
    };
  };
  useEffect(() => {
    if (deleteStatus) {
      fetchData(1); // Fetch data again after deletion
      setDeleteStatus(false); // Reset delete status
    }
  }, [deleteStatus]);
  return (
    <div>
      <SourceListHeader
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
        <CreateSource
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
        <p>Are you sure you want to delete this lead source?</p>
      </Modal>
    </div>
  );
};

export default SourceList;
