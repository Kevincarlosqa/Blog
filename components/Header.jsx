import { useContext, useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";
import { getCategories } from "@/services";
import birds from "../public/birds.json";

const Header = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="container mx-auto px-4 lg:px-10 mb-8 ">
      <div className="border-b w-full  border-gray-400 py-5 lg:py-7 flex flex-row justify-center flex-wrap lg:inline-block align-middle">
        <div className="md: float-left block">
          <Link href="/">
            {/* <span className="cursor-pointer font-bold text-4xl text-white">
              Kevin Blog
            </span> */}
            <Image
              src="/kevincarlosqablog.webp"
              alt=""
              width={200}
              height={50}
            />
          </Link>
        </div>
        <div className=" md:float-left md:contents flex flex-row">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <p>
                {"  "}
                <span className="md:float-right align-middle text-white ml-4 font-semibold cursor-pointer">
                  | {category.name}
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
