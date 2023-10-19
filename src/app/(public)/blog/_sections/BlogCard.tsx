import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const BlogCard = ({ id, title, createdAt, user, image, desc }) => {
  return (
    <div className="mx-auto mb-6 p-4 w-full h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full cursor-pointer">
        <Link href={`/blog/view/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-40 md:h-64 object-cover object-center"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <p className="text-sm text-gray-500">
              {format(new Date(createdAt), "MMMM-dd-yyyy")}
            </p>
            <p className="text-sm text-gray-500">By {user?.name}</p>
            <p className="mt-2 text-gray-700">
              {desc.length > 100 ? desc.slice(0, 100) + "..." : desc}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default BlogCard;
