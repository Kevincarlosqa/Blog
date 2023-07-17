import Image from "next/image";
import React from "react";
import moment from "moment";
import SyntaxHighlighter from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism/coy";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    console.log(post.content.raw.children);

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case "code-block":
        return (
          // <code
          //   key={index}
          //   className="bg-gray-800 overflow-y-scroll rounded-md p-2 text-sm text-white"
          // >
          // {modifiedText.map((item, i) => (
          //   <React.Fragment key={i}>{item}</React.Fragment>
          // ))}
          // </code>

          <pre className="bg-gray-800 p-4 rounded-lg">
            <code className="block text-white">
              {" "}
              {modifiedText.map((item, i) => (
                <React.Fragment key={i}>{item}</React.Fragment>
              ))}
            </code>
          </pre>

          // <SyntaxHighlighter language="javascript" style={coy}>
          //   {modifiedText.map((item, i) => (
          //     <React.Fragment key={i}>{item}</React.Fragment>
          //   ))}
          // </SyntaxHighlighter>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-black bg-opacity-80 shadow-lg rounded-lg lg:p-8 pb-12 mb-8 text-white">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          width={750}
          height={750}
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full ">
          <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              height={30}
              width={30}
              className="align-middle rounded-full"
              as="image"
            />
            <p className="inline align-middle text-white ml-2 text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold ">{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          console.log(typeObj.children);
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
