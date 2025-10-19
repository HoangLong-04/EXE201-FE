import React, { useEffect, useState } from "react";
import PrivateApi from "../../../services/PrivateApi";
import DonatorTable from "../../../components/paginationTable/DonatorTable";

function WebDonator() {
  const [donator, setDonator] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDonator = async () => {
      try {
        const response = await PrivateApi.getWebDonator({ page, pageSize });
        setDonator(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDonator();
  }, [page, pageSize]);
  return (
    <div className="p-8">
      <DonatorTable
        data={donator}
        totalPages={totalPages}
        onPageChange={setPage}
        currentPage={page}
      />
    </div>
  );
}

export default WebDonator;
