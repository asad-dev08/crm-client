import React, { useState } from "react";
import PaginatedDataGrid from "../../../components/theme/global/datagrid/PaginatedDataGrid";
import UserListHeader from "./UserListHeader";
import CreateUser from "../create-user/CreateUser";

const UserList = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  console.log(open);

  const url = "https://api.example.com/users";
  return (
    <div>
      <UserListHeader showDrawer={showDrawer} />
      <PaginatedDataGrid columns={columns} url={url} />
      {open && <CreateUser onClose={onClose} open={open} data={null} />}
    </div>
  );
};

export default UserList;
