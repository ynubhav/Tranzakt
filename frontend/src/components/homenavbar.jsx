import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Homenav({ pfplink }) {
  const navigate = useNavigate();
  const [islogged, setlogged] = useState(false);
  const [firstname, setfirstname] = useState("xxxxxxxx");
  const [focused, setFocused] = useState(new Array(7).fill(false));
  const [drop, setdropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handledropdown = () => {
    setdropdown((prev) => !prev);
  };

  const handleclick = (i) => {
    setFocused(
      focused.map((d, ind) => {
        return ind === i;
      })
    );
  };

  useEffect(() => {
    try {
      const x = localStorage.getItem("token");
      axios
        .get(`${apiUrl}/user/me`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setfirstname(response.data.firstname);
          setlogged(true);
        })
        .catch((err) => {
          console.error("Token invalid or request failed");
        });
    } catch (error) {
      console.log("hello err");
    }
  }, []);

  return (
    <div className="w-full p-2 border-b-2 border-b-gray-500 flex justify-between items-center bg-gray-950 flex-wrap">
      <span
        onClick={() => {
          navigate("/home");
        }}
        className="font-bold text-2xl pl-2 text-orange-500 text-center cursor-pointer"
      >
        Tranzakt.pay
      </span>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setMobileMenu((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:inline-flex justify-between align-middle text-white flex-wrap">
        <span
          className={`my-2 mx-4 sm:mx-2 p-2 hover:cursor-pointer rounded-2xl hover:underline underline-offset-8 decoration-white decoration-1 bg-${
            focused[0] ? "orange-500" : ""
          }`}
        >
          About
        </span>
        <span
          className={`my-2 mx-4 sm:mx-2 p-2 hover:cursor-pointer rounded-2xl hover:underline underline-offset-8 decoration-white decoration-1 bg-${
            focused[1] ? "orange-500" : ""
          }`}
        >
          Features
        </span>
        <span
          className={`my-2 mx-4 sm:mx-2 p-2 hover:cursor-pointer rounded-2xl hover:underline underline-offset-8 decoration-white decoration-1 bg-${
            focused[2] ? "orange-500" : ""
          }`}
        >
          Blogs
        </span>
        <span
          className={`my-2 mx-4 sm:mx-2 p-2 hover:cursor-pointer rounded-2xl hover:underline underline-offset-8 decoration-white decoration-1 bg-${
            focused[3] ? "orange-500" : ""
          }`}
        >
          Plans
        </span>
        {islogged && (
          <span className="my-2 ml-4 p-2 font-bold">Hello {firstname}</span>
        )}
        {!islogged && (
          <span
            onClick={() => {
              navigate("/signin");
            }}
            className={`my-2 mx-4 sm:mx-2 p-2 hover:cursor-pointer rounded-2xl hover:underline underline-offset-8 decoration-white decoration-1 bg-${
              focused[5] ? "orange-500" : ""
            }`}
          >
            Login
          </span>
        )}
        {islogged && (
          <button onMouseEnter={handledropdown}>
            <div>
              <img
                className="w-10 h-10 rounded-full border-1 mx-2 border-white hover:cursor-pointer"
                src={pfplink}
                alt="pfp"
              />
            </div>
          </button>
        )}
        {drop && (
          <span
            onMouseLeave={handledropdown}
            className="bg-black text-white rounded-md shadow-white transition-all shadow-sm absolute top-20 right-4 p-3 grid grid-cols-1"
          >
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="hover:bg-gray-900 hover:cursor-pointer p-2 rounded-sm text-left"
            >
              Profile
            </button>
            <button
              onClick={() => {
                navigate("/tranzaktions");
              }}
              className="hover:bg-gray-900 hover:cursor-pointer p-2 rounded-sm text-left"
            >
              Tranzactions
            </button>
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className="hover:bg-gray-900 hover:cursor-pointer p-2 rounded-sm text-left"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                handleLogout({ navigate });
              }}
              className="hover:bg-gray-900 hover:cursor-pointer p-2 rounded-sm text-left text-red-500"
            >
              Logout
            </button>
          </span>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="w-full md:hidden mt-2 text-white bg-gray-900 rounded-md p-3 space-y-2">
          <span className="block p-2 hover:bg-gray-800 rounded-" onClick={() => navigate("/about")}>About</span>
          <span className="block p-2 hover:bg-gray-800 rounded-sm" onClick={() => navigate("/features")}>Features</span>
          <span className="block p-2 hover:bg-gray-800 rounded-sm" onClick={() => navigate("/blogs")}>Blogs</span>
          {islogged && (
            <span className="block p-2 hover:bg-gray-800 rounded-sm" onClick={() => navigate("/dashboard")}>Dashboard</span>
          )}
          <span className="block p-2 hover:bg-gray-800 rounded-sm" onClick={() => navigate("/plans")}>Plans</span>
          {!islogged && (
            <span className="block p-2 hover:bg-gray-800 rounded-sm text-red-500" onClick={() => navigate("/signin")}>Login</span>
          )}
          {islogged && (
            <>
              <button
                className="block p-2 hover:bg-gray-800 rounded-sm text-left w-full"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                className="block p-2 hover:bg-gray-800 rounded-sm text-left w-full"
                onClick={() => navigate("/tranzaktions")}
              >
                Tranzactions
              </button>
              <button
                className="block p-2 hover:bg-gray-800 rounded-sm text-left w-full text-red-500"
                onClick={() => handleLogout({ navigate })}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function handleLogout({ navigate }) {
  toast("Are you sure you want to logout?", {
    action: {
      label: "Yes",
      onClick: () => {
        toast.dismiss();
        localStorage.removeItem("token");
        navigate("/home");
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {
        toast.dismiss();
      },
    },
  });
}
