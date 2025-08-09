import ProfButton from "../components/profbutton";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Profile() {
  const navigate = useNavigate();
  const [retract, setretract] = useState(false);
  const [initalmargin, setinimargin] = useState('0');
  useEffect(() => {
    try {
      const x = localStorage.getItem("token");
      axios
        .get(`${apiUrl}/user/me`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {})
        .catch((err) => {
          console.error("Token invalid or request failed");
          navigate("/signin");
        });
    } catch (error) {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {!retract && (
        <span className="">
          <div className="absolute top-0 left-0 min-h-screen w-max bg-gray-950">
            <div className="grid grid-cols-1 gap-8">
              <span
                onClick={() => {
                  setretract(!retract);
                }}
                className=" text-2xl text-orange-500 bg-gray-950 font-bold py-2 flex justify-center hover:cursor-pointer"
              >
                <div className="flex items-center pt-2">
                  Tranzakt.pay
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </span>
              <ProfButton
                name={
                  <p className="flex items-center gap-2">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>{" "}
                    {"Home"}
                  </p>
                }
                onClick={() => {
                  navigate("/home");
                }}
              />
              <ProfButton
                name={
                  <span className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 14H4m6.5 3L8 20m5.5-3 2.5 3M4.88889 17H19.1111c.4909 0 .8889-.4157.8889-.9286V4.92857C20 4.41574 19.602 4 19.1111 4H4.88889C4.39797 4 4 4.41574 4 4.92857V16.0714c0 .5129.39797.9286.88889.9286ZM13 14v-3h4v3h-4Z"
                      />
                    </svg>
                    <span className="font-medium">Dashboard</span>
                  </span>
                }
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
              <ProfButton
                name={
                  <p className="flex items-center gap-2">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
                      />
                    </svg>

                    {"Wallet"}
                  </p>
                }
                onClick={() => {}}
              />
              <ProfButton
                name={
                  <p className="flex items-center gap-2">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
                      />
                    </svg>

                    {"Tranzactions"}
                  </p>
                }
                onClick={() => {
                  navigate("/tranzaktions");
                }}
              />
              <ProfButton
                name={
                  <p className="flex items-center gap-2">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2"
                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>

                    {"Friends"}
                  </p>
                }
                onClick={() => {}}
              />
              <ProfButton
                name={
                  <p className="flex items-center gap-2">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10.7367 14.5876c.895.2365 2.8528.754 3.1643-.4966.3179-1.2781-1.5795-1.7039-2.5053-1.9117-.1034-.0232-.1947-.0437-.2694-.0623l-.6025 2.4153c.0611.0152.1328.0341.2129.0553Zm.8452-3.5291c.7468.1993 2.3746.6335 2.6581-.5025.2899-1.16213-1.2929-1.5124-2.066-1.68348-.0869-.01923-.1635-.03619-.2262-.0518l-.5462 2.19058c.0517.0129.1123.0291.1803.0472Z"
                      />
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M9.57909 21.7008c5.35781 1.3356 10.78401-1.9244 12.11971-7.2816 1.3356-5.35745-1.9247-10.78433-7.2822-12.11995C9.06034.963624 3.6344 4.22425 2.2994 9.58206.963461 14.9389 4.22377 20.3652 9.57909 21.7008ZM14.2085 8.0526c1.3853.47719 2.3984 1.1925 2.1997 2.5231-.1441.9741-.6844 1.4456-1.4013 1.6116.9844.5128 1.485 1.2987 1.0078 2.6612-.5915 1.6919-1.9987 1.8347-3.8697 1.4807l-.454 1.8196-1.0972-.2734.4481-1.7953c-.2844-.0706-.575-.1456-.8741-.2269l-.44996 1.8038-1.09594-.2735.45407-1.8234c-.10059-.0258-.20185-.0522-.30385-.0788-.15753-.0411-.3168-.0827-.47803-.1231l-1.42812-.3559.54468-1.2563s.80844.215.7975.1991c.31063.0769.44844-.1256.50282-.2606l.71781-2.8766.11562.0288c-.04375-.0175-.08343-.0288-.11406-.0366l.51188-2.05344c.01375-.23312-.06688-.52719-.51125-.63812.01718-.01157-.79688-.19813-.79688-.19813l.29188-1.17187 1.51313.37781-.0013.00562c.2275.05657.4619.11032.7007.16469l.4497-1.80187 1.0965.27343-.4406 1.76657c.2944.06718.5906.135.8787.20687l.4375-1.755 1.0975.27344-.4493 1.8025Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    {"TZT"}
                  </p>
                }
                onClick={() => {}}
              />
              <ProfButton
                name={
                  <p className="flex items-center gap-2">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    {"Get Free Money"}
                  </p>
                }
                onClick={() => {}}
              />
              <ProfButton
                name={
                  <p className="flex items-center gap-2 text-red-500">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                      />
                    </svg>
                    {"Logout"}
                  </p>
                }
                onClick={() => {
                  handleLogout({ navigate });
                }}
              />
            </div>
          </div>
        </span>
      )}
      {retract && (
        <span
          className="hover:cursor-pointer"
          onClick={() => {
            setretract(!retract);
            if (retract) setinimargin("42");
            else setinimargin("200");
          }}
        >
          <div className="absolute top-0 left-0 h-screen w-max p-4 bg-gray-950 ">
            <div className="my-4 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </span>
      )}
    </div>
  );
}

function handleLogout({ navigate }) {
  toast("Are you sure you want to logout?", {
    action: {
      label: "Yes",
      onClick: () => {
        // 🔥 Real logout logic here
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
