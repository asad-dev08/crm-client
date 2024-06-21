import React, { useEffect, useState } from "react";
import PaginatedDataGrid from "../../../components/theme/global/datagrid/PaginatedDataGrid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteCampaignForm,
  getCampaignForm,
  getCampaignFormsWithPagination,
} from "../../../redux/campaign/campaignFormSlice";
import { Button, Dropdown, Menu, Modal, Input } from "antd";
import {
  MdAdd,
  MdDeleteOutline,
  MdLink,
  MdMoreVert,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import toast from "react-hot-toast";
import { getPermissionsForMenu } from "../../../util/helper";
import CampaignFormListHeader from "./CampaignFormListHeader";

const CampaignFormList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteType, setDeleteType] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [urlModalVisible, setUrlModalVisible] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");
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

  const showUrlModal = (url) => {
    setPublicUrl(url);
    setUrlModalVisible(true);
  };

  const handleUrlModalOk = () => {
    setUrlModalVisible(false);
  };

  const handleUrlModalCancel = () => {
    setUrlModalVisible(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    toast.success("URL copied to clipboard", { duration: 2000 });
  };

  const getMenu = (row) => (
    <Menu onClick={(e) => handleMenuClick(e, row)}>
      <Menu.Item
        key="url"
        onClick={() =>
          showUrlModal(
            `http://localhost:3000/campaign/user-form-submission/${row.id}`
          )
        }
      >
        <div className="flex items-center gap-2">
          <MdLink />
          Get Public URL
        </div>
      </Menu.Item>
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
      const response = await dispatch(getCampaignForm(row.id));
      const data =
        (await response) && response.payload && response.payload.data;
      setSelectedRow(data);
      showDrawer();
      setIsAdd(false);
    } else if (e.key === "create-form") {
      navigate(`/campaign/campaign-form/${row.id}`, { replace: true });
    }
  };

  const showDeleteModal = (e, row) => {
    setSelectedRow(row);
    setDeleteModalVisible(true);
  };

  const handleDeleteModalOk = async () => {
    const response = await dispatch(deleteCampaignForm(selectedRow.id));
    if (response) {
      toast.success("CampaignForm deleted", { duration: 3000 });
      setDeleteType(true); // Trigger data refetch
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
    return data.map((item) => ({
      ...item,
      is_active: item.is_active ? "Active" : "Inactive",
    }));
  };

  const fetchData = async (page = 0, pageSize = 0) => {
    const response = await dispatch(
      getCampaignFormsWithPagination({
        tableName: "campaign-form",
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
    if (deleteType) {
      fetchData(1); // Fetch data again after deletion
      setDeleteType(false); // Reset delete status
    }
  }, [deleteType]);

  return (
    <div>
      <CampaignFormListHeader
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
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        maskClosable={false}
      >
        <p>Are you sure you want to delete this campaign form?</p>
      </Modal>
      <Modal
        title="Public URL"
        visible={urlModalVisible}
        onOk={handleUrlModalOk}
        onCancel={handleUrlModalCancel}
        footer={[
          <Button key="copy" onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>,
          <Button key="ok" type="primary" onClick={handleUrlModalOk}>
            OK
          </Button>,
        ]}
      >
        <Input value={publicUrl} readOnly />
      </Modal>
    </div>
  );
};

export default CampaignFormList;
