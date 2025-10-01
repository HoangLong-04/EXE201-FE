import React from "react";

function DashboardCard({ Icon, title, data }) {
  return (
    <div className="w-[30%] h-[20dvh] flex items-center justify-center rounded-2xl px-2 shadow-lg transition hover:shadow-none">
      <div className="flex justify-center gap-10 items-center w-[100%]">
        <div className="bg-blue-400 p-2 rounded-2xl">{Icon}</div>
        <div className="flex flex-col justify-center items-center">
          <p className="">{title}</p>
          <p className="text-3xl font-semibold">{data}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
