"use client";

import React from "react";
import TeamMemberCard from "./_sections/TeamMemberCard";
import { Card } from "flowbite-react";

const ContactPage = () => {
  const teamMembers = [
    {
      name: "Muhammad Mehadi",
      role: "CEO",
      imageUrl:
        "https://media.licdn.com/dms/image/D5603AQGYCH9IQBBljw/profile-displayphoto-shrink_200_200/0/1695850907991?e=1702512000&v=beta&t=JUvO7gX3qRTonLX-VFFBhnw53yujPnR8m6J34ZS8rGU",
    },
    {
      name: "Sakib Al Hassan",
      role: "FrontEnd Developer",
      imageUrl: "https://resources.pulse.icc-cricket.com/players/284/201.png",
    },
    {
      name: "Tamim Iqbal",
      role: "Backend Developer",
      imageUrl:
        "https://www.bssnews.net/assets/news_photos/2023/05/15/image-125579-1684155414.jpg",
    },
    {
      name: "Mushfiqur Rahim",
      role: "UI/UX Designer",
      imageUrl: "https://resources.pulse.icc-cricket.com/players/210/491.png",
    },
    {
      name: "Mahmudullah Riad",
      role: "Hr Manager",
      imageUrl:
        "https://admin.dailycricket.com.bd/storage/posts/17123/ezgif-2-9828453b56.jpg",
    },
    {
      name: "Mashrafee Bin Mortaza",
      role: "Project Manager",
      imageUrl:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316500/316529.png",
    },
  ];
  return (
    <div>
      <div className="container mx-auto p-4">
        {/* form */}
        <div className="container mx-auto py-4">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <Card>
            <form onClick={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 block w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 block w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 p-2 block w-full border rounded-md"
                ></textarea>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Submit
              </button>
            </form>
          </Card>
        </div>
        {/* out team */}
        <div className="container mx-auto py-14">
          <h2 className="text-4xl font-bold mb-10">Our Team</h2>
          <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
        {/* details */}
        <Card>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Company Details</h2>
              <p>Company Name</p>
              <p>Address: 123 Main St, City, Country</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Email: info@company.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Locations</h2>
              <ul>
                <li>Location 1: 456 Branch Ave, City1</li>
                <li>Location 2: 789 Street Rd, City2</li>
                {/* Add more locations as needed */}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
