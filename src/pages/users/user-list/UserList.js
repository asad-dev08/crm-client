import React, { useEffect, useState } from "react";
import PaginatedDataGrid from "../../../components/theme/global/datagrid/PaginatedDataGrid";
import UserListHeader from "./UserListHeader";
import CreateUser from "../create-user/CreateUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, getUsersWithPagination } from "../../../redux/user/userSlice";
import { Button, Dropdown, Menu } from "antd";
import { MdMoreVert } from "react-icons/md";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rowsPerPage = 10;
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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
      <Menu.Item key="delete">Delete</Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
    </Menu>
  );
  const handleMenuClick = async (e, row) => {
    // Handle menu item click
    console.log("Clicked option:", e.key);
    console.log("Row data:", row);
    if (e.key === "edit") {
      const response = await dispatch(getUser(row.id));
      const data =
        (await response) && response.payload && response.payload.data;
      setSelectedRow(data);
      showDrawer();
      setIsAdd(false);
    }
  };
  const columns = [
    { columnName: "username", columnShow: "Username" },
    { columnName: "email", columnShow: "Email" },
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
    email: {
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
  const fetchData = async (page = 0, pageSize = rowsPerPage) => {
    const response = await dispatch(
      getUsersWithPagination({
        tableName: "users",
        page: page - 1,
        pageSize: pageSize,
      })
    );

    const data = (await response.payload) && response.payload.data;
    return {
      data: (data && data.rows) || [],

      total: (data && data.total.total) || 0,
      totalPages: (data && Math.ceil(data.total.total / rowsPerPage)) || 0,
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
      <UserListHeader showDrawer={showDrawer} setIsAdd={setAddOrEdit} />
      <PaginatedDataGrid
        columns={columns}
        fetchData={fetchData}
        cellFormatting={cellFormatting}
        dataManipulator={manipulateData}
      />
      {open && (
        <CreateUser
          onClose={onClose}
          open={open}
          data={selectedRow}
          isAdd={isAdd}
        />
      )}
    </div>
  );
};

export default UserList;
