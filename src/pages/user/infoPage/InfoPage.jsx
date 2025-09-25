import React from "react";
import UserInfo from "../../../components/userInfo/UserInfo";
import Logo from "../../../assets/logo-exe.png";

function InfoPage() {
  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <UserInfo
        img={"https://freesvg.org/img/abstract-user-flat-3.png"}
        fullName={"Lê Hoàng Long"}
        id={182935}
        phone={"0849017399"}
        bankAcc={"0849017399"}
        email={"longfg333@gmail.com"}
        address={"ggg"}
        school={"FPT"}
      />
    </div>
  );
}

export default InfoPage;
