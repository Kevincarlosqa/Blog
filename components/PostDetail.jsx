import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-funky.css";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/components/prism-jsx";
import Image from "next/image";
import React, { useEffect } from "react";
import moment from "moment";
import SyntaxHighlighter from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism/coy";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";

const PostDetail = ({ post }) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [post]); // <--- run when post updates

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    // let link = href;
    // console.log(post.content.raw.children);
    // console.log(modifiedText);
    // if (link) {
    //   return <h1>link</h1>;
    // }

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

          <pre className="bg-gray-800 p-4 rounded-lg w-full md:text-sm overflow-x-scroll overflow-visible lg:overflow-x-hidden">
            <code className=" text-white">
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
      case "href":
        return (
          <Link href={obj.href}>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>hello</React.Fragment>
            ))}
          </Link>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-black bg-opacity-90 shadow-lg rounded-lg lg:p-8 pb-12 mb-8 text-white w-full">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          width={750}
          height={750}
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full justify-between">
          <div className="flex items-center  lg:mb-0 lg:w-auto mr-8">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              height={30}
              width={30}
              className="align-middle rounded-full"
              as="image"
            />
            <p className="inline align-middle text-white ml-2 lg:text-lg text-sm">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-white flex">
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
            <span className="flex flex-row">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
        <h1 className="mb-8 lg:text-3xl font-semibold text-center text-2xl">
          {post.title}
        </h1>
        {
          <RichText
            content={post.content.raw}
            renderers={{
              p: ({ children }) => (
                <>
                  <p className="text-white">{children}</p>
                  <br />
                </>
              ),
              h1: ({ children }) => <h1 className="text-white">{children}</h1>,
              h3: ({ children }) => (
                <>
                  <h3 className="text-white font-bold text-2xl">{children}</h3>{" "}
                  <br />{" "}
                </>
              ),
              bold: ({ children }) => <strong>{children}</strong>,
              blockquote: ({ children }) => (
                <>
                  <blockquote
                    style={{
                      paddingLeft: "16px",
                      borderLeft: "4px solid blue",
                      fontSize: "15px",
                    }}
                  >
                    {children}
                  </blockquote>
                  <br />
                </>
              ),
              a: ({ children, openInNewTab, href, rel, ...rest }) => {
                if (href.match(/^https?:\/\/|^\/\//i)) {
                  return (
                    <a
                      href={href}
                      target={openInNewTab ? "_blank" : "_self"}
                      rel={rel || "noopener noreferrer"}
                      {...rest}
                      className="text-blue-500"
                    >
                      {children}
                    </a>
                  );
                }

                return (
                  <Link href={href} className="text-blue-500">
                    <a {...rest} className="text-blue-500">
                      {children}
                    </a>
                  </Link>
                );
              },
              code_block: ({ children }) => {
                return (
                  <>
                    <pre
                      className="language-js"
                      style={{
                        background: "black",
                        borderRadius: "10px",
                      }}
                    >
                      <code
                        style={{
                          background: "black",
                        }}
                      >
                        {children}
                      </code>
                    </pre>
                    <br />
                  </>
                );
              },
            }}
          />
        }
        {/* {post.content.raw.children.map((typeObj, index) => {
          console.log(typeObj);
          // let link = null;
          // const children = typeObj.children.map((item, itemIndex) => {
          //   // console.log(item.href);
          //   // if (item.href) link = item.href;
          //   return getContentFragment(itemIndex, item.text, item);
          // });
          // // console.log(children);
          // return getContentFragment(
          //   index,
          //   children,
          //   typeObj,
          //   typeObj.type
          //   // link
          // );
          <RichText
            content={typeObj}
            renderers={{
              h1: ({ children }) => (
                <h1 className="text-blue-500">{children}</h1>
              ),
              bold: ({ children }) => <strong>{children}</strong>,
              a: ({ children, openInNewTab, href, rel, ...rest }) => {
                if (href.match(/^https?:\/\/|^\/\//i)) {
                  return (
                    <a
                      href={href}
                      target={openInNewTab ? "_blank" : "_self"}
                      rel={rel || "noopener noreferrer"}
                      {...rest}
                      className="text-blue-500"
                    >
                      {children}
                    </a>
                  );
                }

                return (
                  <Link href={href} className="text-blue-500">
                    <a {...rest} className="text-blue-500">
                      {children}
                    </a>
                  </Link>
                );
              },
            }}
          />;
        })} */}
      </div>
    </div>
  );
};

export default PostDetail;
