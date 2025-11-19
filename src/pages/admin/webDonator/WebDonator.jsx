import React, { useEffect, useState } from "react";
import PrivateApi from "../../../services/PrivateApi";
import DonatorTable from "../../../components/paginationTable/DonatorTable";

function WebDonator() {
  const [donator, setDonator] = useState([]);
  const [Page, setPage] = useState(1);
  const [PageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDonator = async () => {
      try {
        const response = await PrivateApi.getWebDonator({ Page, PageSize });
        const data = response.data;
        const paidPaymnent = data.items.filter((item) => item.status === "Paid");
        setDonator(paidPaymnent);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDonator();
  }, [Page, PageSize]);
  return (
    <div className="p-8">
      <DonatorTable
        data={donator}
        totalPages={totalPages}
        onPageChange={setPage}
        currentPage={Page}
      />
    </div>
  );
}

export default WebDonator;
