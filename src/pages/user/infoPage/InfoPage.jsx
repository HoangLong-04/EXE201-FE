import { useEffect, useState } from "react";
import UserInfo from "../../../components/userInfo/UserInfo";
import { useAuth } from "../../../hooks/useAuth";
import PrivateApi from "../../../services/PrivateApi";
import { toast } from "react-toastify";

function InfoPage() {
  const [userInfo, setUserInfo] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    school: "",
    phone: "",
    avatarUrl: "",
    email: "",
  });

  const fetchUserInfo = async () => {
    try {
      const response = await PrivateApi.getUser4User();
      setUserInfo(response.data);
      setForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeUserInfo = async () => {
    const { email, role, createdAt, id, isActive, ...senData } = form;
    try {
      await PrivateApi.changeUserInfo(senData);
      fetchUserInfo();
      toast.success("Đổi thành công");
    } catch (error) {
      toast.error("Lỗi");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <UserInfo
        form={form}
        setForm={setForm}
        userInfo={userInfo}
        onUpdate={handleChangeUserInfo}
      />
    </div>
  );
}

export default InfoPage;
