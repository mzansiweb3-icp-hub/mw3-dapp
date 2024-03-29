/*eslint-disable*/
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoCardOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoDocumentsOutline } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import NotificationDropdown from "./NotificationDropdown";
import { Logo } from "../assets";
import { useAuth } from "../hooks/Context";

const Sidebar = () => {
  const { isAdmin } = useAuth();
  const [tab, setTab] = useState<string>("");
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="md:left-0 md:block bg-gradient-to-t from-blue-500 to-blue-400  text-white md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded  border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <div className="flex justify-between items-center w-full md:flex-none">
            <Link
              className="md:block text-4xl md:pb-2 text-white mr-0  font-bold p-4 px-0"
              to="/submissions"
            >
              <div className="flex justify-center gap-2">
                <img src={Logo} alt="logo" className="w-10 h-10" />
                <h3 className="font-graphikSemiBold">MW3</h3>
              </div>
            </Link>
            <button
              className="cursor-pointer md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setShowMenu(true)}
            >
              <TiThMenu size={30} className="text-white BF" />
            </button>
            {showMenu && (
              <div
                className={` fixed top-0 left-0 right-0 bottom-0 z-100 bg-black bg-opacity-70`}
              >
                <div className="absolute top-0 right-0 z-10 min-w-[200px] bg-cyan-700 px-5">
                  <button
                    className="text-xl pb-5 pt-3"
                    onClick={() => setShowMenu(false)}
                  >
                    <AiOutlineClose />
                  </button>
                  <ul className="list-none flex-1 items-center flex-col justify-end ">
                    {/* <li>
                      <button
                        className={`font-normal text-[16px] mb-4`}
                        onClick={() => {
                          setShowMenu(false);
                          navigate("/home");
                        }}
                      >
                        Home
                      </button>
                    </li> */}
                    <li>
                      <button
                        className={`font-normal text-[16px] mb-4`}
                        onClick={() => {
                          setShowMenu(false);
                          navigate("/submissions");
                        }}
                      >
                        Submissions
                      </button>
                    </li>
                    <li>
                      <button
                        className={`font-normal text-[16px] mb-4`}
                        onClick={() => {
                          setShowMenu(false);
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className={`font-normal text-[16px] mb-4`}
                        onClick={() => {
                          setShowMenu(false);
                          navigate("/guides");
                        }}
                      >
                        Guides
                      </button>
                    </li>
                    {isAdmin && (
                      <li>
                        <button
                          className={`font-normal text-[16px] mb-4`}
                          onClick={() => {
                            setShowMenu(false);
                            navigate("/admin");
                          }}
                        >
                          Admin
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left text-4xl md:pb-2 text-white mr-0 inline-block whitespace-nowrap font-bold p-4 px-0"
                    to="/submissions"
                  >
                    <img src={Logo} alt="logo" className="w-10 h-10" />
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            <ul className="md:flex-col md:min-w-full flex gap-[20px] flex-col list-none">
              {/* <li className="items-center">
                <Link
                  to="/home"
                  onClick={() => setTab("home")}
                  className={`
                    text-xs uppercase py-3 font-bold  flex items-center gap-2 px-3  ${
                      tab === "home"
                        ? "text-cyan-500 rounded-xl bg-white hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500"
                    }
                 
                  `}
                >
                  <CiHome
                    size={20}
                    className={`
                      fas fa-tv mr-2 text-sm ${
                        tab === "home" ? "opacity-75" : "text-blueGray-300"
                      }
                    `}
                  />
                  <span>Home</span>
                </Link>
              </li> */}
              <li className="items-center">
                <Link
                  to="/submissions"
                  onClick={() => setTab("submissions")}
                  className={`
                    text-xs uppercase py-3 font-bold  flex items-center gap-2 px-3  ${
                      tab === "submissions"
                        ? "text-cyan-500 rounded-xl bg-white hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500"
                    }
                 
                  `}
                >
                  <IoCardOutline
                    size={20}
                    className={`
                      fas fa-tv mr-2 text-sm ${
                        tab === "submissions"
                          ? "opacity-75"
                          : "text-blueGray-300"
                      }
                    `}
                  />
                  <span>Submissions</span>
                </Link>
              </li>
              <li className="items-center">
                <Link
                  to="/profile"
                  onClick={() => setTab("profile")}
                  className={`
                  text-xs uppercase py-3 font-bold  w-full flex items-center gap-2 px-3  ${
                    tab === "profile"
                      ? "text-cyan-500 rounded-xl bg-white hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }
        
                  `}
                >
                  <CiSettings
                    size={20}
                    className={`${
                      tab === "profile" ? "opacity-75" : "text-blueGray-300"
                    }
                    `}
                  />
                  <span>Profile</span>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <Link
              to="/guides"
              onClick={() => setTab("guides")}
              className={`
                  text-xs uppercase py-3 font-bold  w-full flex items-center gap-2 px-3  ${
                    tab === "guides"
                      ? "text-cyan-500 rounded-xl bg-white hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }
        
                  `}
            >
              <IoDocumentsOutline
                size={20}
                className={`${
                  tab === "guides" ? "opacity-75" : "text-blueGray-300"
                }
                `}
              />
              <span>Guides</span>
            </Link>
            {isAdmin &&  <Link
              to="/admin"
              onClick={() => setTab("admin")}
              className={`
                  text-xs uppercase py-3 font-bold  w-full flex items-center gap-2 px-3  ${
                    tab === "admin"
                      ? "text-cyan-500 rounded-xl bg-white hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500"
                  }
        
                  `}
            >
              <IoDocumentsOutline
                size={20}
                className={`${
                  tab === "admin" ? "opacity-75" : "text-blueGray-300"
                }
                `}
              />
              <span>Admin</span>
            </Link>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
