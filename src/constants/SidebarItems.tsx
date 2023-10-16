"use client";

import { Sidebar } from "flowbite-react";

import { AiFillProfile, AiOutlineUser, AiTwotoneEdit } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export const SidebarItems = ({ role = "" }: { role: string }) => {
  const router = usePathname();
  const superAdminRoutes = [
    {
      name: "Manage Admin",
      href: "adshboard/super-admin/manage-admin",
      icon: RiAdminFill,
      children: [
        {
          name: "Manage Admin",
          href: "/dashboard/super-admin/manage-admin",
          icon: MdOutlineAdminPanelSettings,
        },
        {
          name: "Create Admin",
          href: "/dashboard/super-admin/manage-admin/create",
          icon: BsPersonFillAdd,
        },
      ],
    },

    {
      name: "Profile",
      href: "/profile",
      icon: AiFillProfile,
      children: [
        {
          name: "View Profile",
          href: "/dashboard/super-admin/profile",
          icon: GrFormView,
        },
        {
          name: "Edit Profile",
          href: "/dashboard/super-admin/profile/edit",
          icon: AiTwotoneEdit,
        },
      ],
    },
  ];
  useEffect(() => {}, [role]);

  return (
    <>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="h-full"
        style={{
          height: "calc(100vh - 80px)",
        }}
      >
        <Sidebar.Items className=" ">
          <Sidebar.ItemGroup className=" ">
            {superAdminRoutes.map((item, index) => (
              <>
                {item?.children.length > 0 ? (
                  <Sidebar.Collapse icon={item?.icon} label={item?.name}>
                    {item.children.map((child, i) => (
                      <Sidebar.Item
                        href={child?.href}
                        key={i}
                        icon={child?.icon}
                      >
                        {child?.name}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                ) : (
                  <Sidebar.Item href="#" icon={item?.icon} key={index}>
                    <p>{item?.name}</p>
                  </Sidebar.Item>
                )}
              </>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};
