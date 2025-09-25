import React from "react";

function UserInfo({
  email,
  fullName,
  address,
  phone,
  bankAcc,
  school,
  img,
  id,
}) {
  return (
    <div className="border-1 border-gray-300 rounded-lg w-[80%] shadow-lg">
      <div className="border-b-1 border-gray-400 p-2 text-2xl font-semibold">
        Thông tin cơ bản
      </div>
      <div className="p-10">
        <div className="flex items-start gap-5 my-5">
          <p>
            <img width={100} height={100} src={img} alt="" />
          </p>
          <p>Id: {id}</p>
        </div>
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-2">
            <p className="ml-2 text-[rgb(102,102,102)]">Full Name</p>
            <p className="bg-[rgb(237,228,228)] border-b-1 py-2 pl-2">
              {fullName}
            </p>
          </div>
          <div className="col-span-2">
            <p className="ml-2 text-[rgb(102,102,102)]">Address</p>
            <p className="bg-[rgb(237,228,228)] border-b-1 py-2 pl-2">
              {address}
            </p>
          </div>
          <div>
            <p className="ml-2 text-[rgb(102,102,102)]">Email</p>
            <p className="bg-[rgb(237,228,228)] border-b-1 py-2 pl-2">
              {email}
            </p>
          </div>
          <div>
            <p className="ml-2 text-[rgb(102,102,102)]">Phone</p>
            <p className="bg-[rgb(237,228,228)] border-b-1 py-2 pl-2">
              {phone}
            </p>
          </div>
          <div>
            <p className="ml-2 text-[rgb(102,102,102)]">Bank Account</p>
            <p className="bg-[rgb(237,228,228)] border-b-1 py-2 pl-2">
              {bankAcc}
            </p>
          </div>
          <div>
            <p className="ml-2 text-[rgb(102,102,102)]">School</p>
            <p className="bg-[rgb(237,228,228)] border-b-1 py-2 pl-2">
              {school}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
