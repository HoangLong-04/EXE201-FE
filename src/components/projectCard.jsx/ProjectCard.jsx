import React from "react";

function ProjectCard({ image, title, fundRate, category }) {
  return (
    <div className="rounded-3xl w-[35rem] h-[80dvh] overflow-hidden ">
      <div className="border-[12px] border-[rgb(246,243,232)] overflow-hidden rounded-3xl">
        <img
          className="hover:scale-105 w-full h-[20rem] object-cover hover:contrast-50 transform transition duration-300 cursor-pointer"
          src={image}
          alt="Film"
        />
      </div>
      <div className="ml-[2rem] mt-1">
        <div className="flex gap-5 items-center">
          <p>{fundRate}% funded</p>
          <p>-</p>
          <p className="bg-amber-200 rounded-2xl py-1 px-3 font-semibold">{category}</p>
        </div>

        <br />
        <p className="font-medium text-3xl hover:underline cursor-pointer">
          {title}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
