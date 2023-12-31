"use client";

import {Sidebar} from "flowbite-react";

import {
  AiFillProfile,
  AiOutlineAppstoreAdd,
  AiTwotoneEdit,
} from "react-icons/ai";
import {BiListUl, BiLogoBlogger} from "react-icons/bi";
import {BsPersonFillAdd} from "react-icons/bs";
import {FaQuestionCircle} from "react-icons/fa";
import {GrFormView} from "react-icons/gr";
import {IoSettingsOutline} from "react-icons/io5";
import {MdOutlineAdminPanelSettings} from "react-icons/md";
import {RiAdminFill, RiFeedbackFill} from "react-icons/ri";
import {SiCodereview} from "react-icons/si";
import {TbBrandBooking, TbCategory} from "react-icons/tb";

export const SidebarItems = ({role = ""}: {role: string}) => {
  const superAdminRoutes = [
    {
      name: "Manage Admin",
      href: "/dashboard/super-admin/manage-admin",
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
  const adminRoutes = [
    {
      name: "Booking",
      href: "adshboard/admin/manage-admin",
      icon: TbBrandBooking,
      children: [
        {
          name: "Booking List",
          href: "/dashboard/admin/manage-booking",
          icon: BiListUl,
        },
      ],
    },
    {
      name: "Service",
      href: "/dashboard/admin/manage-admin",
      icon: IoSettingsOutline,
      children: [
        {
          name: "Service List",
          href: "/dashboard/admin/manage-service",
          icon: BiListUl,
        },
        {
          name: "Create Service",
          href: "/dashboard/admin/manage-service/create",
          icon: AiOutlineAppstoreAdd,
        },
      ],
    },
    {
      name: "Category",
      href: "/dashboard/admin/manage-admin",
      icon: TbCategory,
      children: [
        {
          name: "Caregory List",
          href: "/dashboard/admin/manage-category",
          icon: BiListUl,
        },
      ],
    },
    {
      name: "Blog",
      href: "/dashboard/admin/manage-blog",
      icon: BiLogoBlogger,
      children: [
        {
          name: "Blog List",
          href: "/dashboard/admin/manage-blog",
          icon: BiListUl,
        },
        {
          name: "Create Blog",
          href: "/dashboard/admin/manage-blog/create",
          icon: AiOutlineAppstoreAdd,
        },
      ],
    },
    {
      name: "Faqs",
      href: "/dashboard/admin/manage-faqs",
      icon: FaQuestionCircle,
      children: [
        {
          name: "Faqs List",
          href: "/dashboard/admin/manage-faqs",
          icon: BiListUl,
        },
        {
          name: "Create Faqs",
          href: "/dashboard/admin/manage-faqs/create",
          icon: AiOutlineAppstoreAdd,
        },
      ],
    },
    {
      name: "Review",
      href: "/dashboard/admin/manage-review",
      icon: SiCodereview,
      children: [
        {
          name: "Review List",
          href: "/dashboard/admin/manage-review",
          icon: BiListUl,
        },
      ],
    },
    {
      name: "Feedback",
      href: "/dashboard/admin/manage-admin",
      icon: RiFeedbackFill,
      children: [
        {
          name: "Feedback List",
          href: "/dashboard/admin/manage-feedback",
          icon: BiListUl,
        },
      ],
    },

    {
      name: "Manage Admin",
      href: "/dashboard/admin/manage-admin",
      icon: RiAdminFill,
      children: [
        {
          name: "Manage Admin",
          href: "/dashboard/admin/manage-admin",
          icon: BiListUl,
        },
        {
          name: "Create Admin",
          href: "/dashboard/admin/manage-admin/create",
          icon: AiOutlineAppstoreAdd,
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
          href: "/dashboard/admin/profile",
          icon: GrFormView,
        },
        {
          name: "Edit Profile",
          href: "/dashboard/admin/profile/edit",
          icon: AiTwotoneEdit,
        },
      ],
    },
  ];

  const userRoutes = [
    {
      name: "Booking",
      href: "/dashboard/user/manage-booking",
      icon: TbBrandBooking,
      children: [
        {
          name: "Booking List",
          href: "/dashboard/user/manage-booking",
          icon: BiListUl,
        },
      ],
    },
    {
      name: "Review",
      href: "/dashboard/user/manage-review",
      icon: SiCodereview,
      children: [
        {
          name: "Review List",
          href: "/dashboard/user/manage-review",
          icon: BiListUl,
        },
        {
          name: "Create Review",
          href: "/dashboard/user/manage-review/create",
          icon: AiOutlineAppstoreAdd,
        },
      ],
    },
    {
      name: "Feedback",
      href: "/dashboard/user/manage-feedback",
      icon: RiFeedbackFill,
      children: [
        {
          name: "Feedback List",
          href: "/dashboard/user/manage-feedback",
          icon: BiListUl,
        },
        {
          name: "Create Feedback",
          href: "/dashboard/user/manage-feedback/create",
          icon: AiOutlineAppstoreAdd,
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
          href: "/dashboard/user/profile",
          icon: GrFormView,
        },
        {
          name: "Edit Profile",
          href: "/dashboard/user/profile/edit",
          icon: AiTwotoneEdit,
        },
      ],
    },
  ];

  return (
    <>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="h-full Sidebar"
        style={{
          height: "calc(100vh - 80px)",
        }}
      >
        <Sidebar.Items className=" ">
          <Sidebar.ItemGroup className=" ">
            {role === "super_admin" &&
              superAdminRoutes.map((item, index) => (
                <>
                  {item?.children.length > 0 ? (
                    <Sidebar.Collapse
                      icon={item?.icon}
                      label={item?.name}
                      style={{
                        color: "black",
                        // backgroundColor: `${item?.href === url ? "green" : ""}`,
                        backgroundColor: "red",
                      }}
                      className="bg-green-800"
                    >
                      {item.children.map((child, i) => (
                        <Sidebar.Item
                          href={child?.href}
                          key={i}
                          icon={child?.icon}
                          style={{
                            backgroundColor: "red",
                          }}
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
            {role === "admin" &&
              adminRoutes.map((item, index) => (
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
            {role === "user" &&
              userRoutes.map((item, index) => (
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
