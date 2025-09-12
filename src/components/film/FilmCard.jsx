import React from "react";

function FilmCard({ image, title, fundRate }) {
  return (
    <div className="rounded-3xl w-[35rem] h-[80dvh] overflow-hidden ">
      <div className="border-[12px] border-[rgb(246,243,232)] overflow-hidden rounded-3xl">
        <img
          className="hover:scale-105 w-full h-[20rem] object-cover hover:contrast-50 transform transition duration-300 cursor-pointer"
          src={image}
          alt="Film"
        />
      </div>
      <div className="ml-[2rem]">
        <p>{fundRate}% funded</p>
        <br />
        <p className="font-medium text-3xl hover:underline cursor-pointer">
          {title}
        </p>
      </div>
    </div>
  );
}

export default FilmCard;
