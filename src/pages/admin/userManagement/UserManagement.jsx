import React, { useEffect, useState } from "react";
import PrivateApi from "../../../services/PrivateApi";
import { toast } from "react-toastify";
import UserTable from "../../../components/paginationTable/UserTable";
import UserModal from "./userModal/UserModal";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [Page, setPage] = useState(1);
  const [PageSize] = useState(5);
  const [Phone, setPhone] = useState("");
  const [FullName, setFullName] = useState("");
  const [userModal, setUserModal] = useState(false);

  const fetchUserList = async () => {
    try {
      const response = await PrivateApi.getUserListAdmin({
        Page,
        PageSize,
        Phone,
        FullName,
      });
      setUsers(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGetUserDetail = async (id) => {
    setUserModal(true);
    try {
      const response = await PrivateApi.getUserDetail(id);
      setUserDetail(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeUserStatus = async (id) => {
    try {
        await PrivateApi.changeUserStatus(id)
        handleGetUserDetail(id)
        toast.success('Status changed')
    } catch (error) {
        toast.error(error.message || 'Error')
    }
  }

  useEffect(() => {
    fetchUserList();
  }, [Page, PageSize, Phone, FullName]);
  return (
    <div className="p-8">
      <UserTable
        currentPage={Page}
        totalPages={totalPages}
        users={users}
        onPageChange={setPage}
        FullName={FullName}
        setFullName={setFullName}
        setPhone={setPhone}
        Phone={Phone}
        onView={handleGetUserDetail}
      />

      <UserModal
        onClose={() => setUserModal(false)}
        user={userDetail}
        open={userModal}
        changeStatus={handleChangeUserStatus}
      />
    </div>
  );
}

export default UserManagement;
