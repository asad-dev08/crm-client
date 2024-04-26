import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import axios from "axios";

const PaginatedDataGrid = ({ columns, url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, { params: { page } })
      .then((response) => {
        setData(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [page, url]);

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
        pagination={{ total }}
      />
    </div>
  );
};

export default PaginatedDataGrid;
