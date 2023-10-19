import React from "react";

const TeamMemberCard = ({ name, role, imageUrl }) => {
  return (
    <div className="p-4 rounded-lg border shadow-md mb-4 hover:shadow-lg cursor-pointer">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[250px] rounded-none mx-auto"
      />
      <h3 className="text-lg font-semibold mt-6">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  );
};

export default TeamMemberCard;
