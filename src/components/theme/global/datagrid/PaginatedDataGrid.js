import React, { useState, useEffect } from "react";
import { Button, Pagination, Table, Typography } from "antd";

const { Text } = Typography;

const PaginatedDataGrid = ({
  columns,
  fetchData,
  cellFormatting,
  dataManipulator,
}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData(currentPage, rowsPerPage)
      .then((response) => {
        // Manipulate data before setting it
        const manipulatedData = dataManipulator
          ? dataManipulator(response.data)
          : response.data;

        setData(manipulatedData);
        setTotalItems(response.total);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, fetchData, dataManipulator, rowsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setCurrentPage(current);
    setRowsPerPage(pageSize);
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
      <div className="text-center my-5">
        {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
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
        )} */}
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={handlePageChange}
          defaultCurrent={currentPage}
          total={totalItems}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>
    </div>
  );
};

export default PaginatedDataGrid;
