import React from "react";

function AddProject() {
  return (
    <div className="bg-[rgb(250,250,191)] rounded-b-4xl py-10">
      <p className="text-6xl text-center font-bold mb-10">
        Điền thông tin dự án
      </p>
      <div className="px-10">
        <div className="mb-5">
          <p className="font-bold text-2xl mb-2">Thể loại</p>
          <select className="pl-3 border-b-1 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0">
            <option value="game">Game</option>
            <option value="film">Phim</option>
            <option value="design">Thiết kế</option>
          </select>
        </div>
        <div className="mb-5">
          <p className="font-bold text-2xl mb-2">Tên dự án</p>
          <input
            placeholder="Nhập tên dự án"
            className="border-b-1 pl-3 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0"
            type="text"
          />
        </div>
        <div className="mb-5">
          <p className="font-bold text-2xl mb-2">Mô tả dự án</p>
          <textarea
            className="border-b-1 pl-3 border-[rgb(246,194,244)] placeholder:text-[rgb(179,179,179)] w-full outline-0"
            rows={4}
            cols={50}
            placeholder="Mô tả dự án của bạn"
          />
        </div>
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Mục tiêu</p>
          <input
            placeholder="Mục tiêu gọi vốn "
            className="border-b-1 pl-3 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0"
            type="number"
          />
        </div>
        <div className="relative flex justify-center items-center">
          <button className="bg-black translate-y-2 px-20 py-2 rounded-3xl text-2xl">
            Nộp
          </button>
          <button className="absolute bg-[rgb(250,250,191)] px-20 py-2 rounded-3xl cursor-pointer text-2xl font-semibold z-10 hover:bg-[rgb(239,239,155)] hover:translate-y-1 transform duration-200 ease-in-out">
            Nộp
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
