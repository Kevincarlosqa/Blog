import React from "react";
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-[85%]">
      <div className="absolute left-0 right-0 -top-14 flex justify-center">
        <Image
          unoptimized
          alt={author.name}
          height={120}
          width={120}
          className="rounded-full w-[120px] h-[120px] object-cover"
          src={author.photo.url}
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
