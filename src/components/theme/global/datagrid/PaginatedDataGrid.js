import React, { useState, useEffect } from "react";
import { Button, Table, Typography } from "antd";

const { Text } = Typography;

const PaginatedDataGrid = ({
  columns,
  fetchData,
  cellFormatting,
  dataManipulator,
}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage)
      .then((response) => {
        // Manipulate data before setting it
        const manipulatedData = dataManipulator
          ? dataManipulator(response.data)
          : response.data;
        setData(manipulatedData);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, fetchData, dataManipulator]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (data && data.length === 0) {
    return <Text>No Data Found</Text>;
  }

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns.map((column) => ({
          title: column.columnShow.toUpperCase(),
          dataIndex: column.columnName,
          key: column.columnName,
          render: (text, record) =>
            column.render ? column.render(record) : text,
          ...cellFormatting[column.columnName], // Apply cell formatting styles
        }))}
        pagination={false}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                margin: "0 4px",
              }}
              type={currentPage === page ? "primary" : "default"}
            >
              {page}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default PaginatedDataGrid;
