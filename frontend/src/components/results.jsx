import { useState } from "react";
import More from "./moreinfo";

export default function Searchedusers({
  firstname,
  lastname,
  username,
  button1,
  onClick1,
  onClick2,
  onMore,
}) {
  const [rendermore, setmore] = useState(false);
  return (
    <>
      <div className="mx-2">
        <div
          onMouseEnter={()=>{setmore(prev=>!prev)}}
          onMouseLeave={()=>{setmore(prev=>!prev)}}
          onClick={()=>{setmore(true)}}
          className="w-1/1 p-2 flex justify-between items-center my-2 rounded-2xl bg-blue-800 shadow-lime-200 hover:cursor-pointer hover:shadow-sm"
        >
          <div className="flex items-center justify-between align-middle">
            <div>
              <img
                className="w-10 h-10 rounded-full border-1 mx-2 border-white"
                src="johnpork.jpeg"
                alt="pfp"
              />
            </div>
            <div className="font-bold text-xl text-gray-300 text-center m-2 hover:cursor-pointer">
              {firstname}
            </div>
          </div>
          {rendermore && <More username={username}/>}
          <div className="flex gap-1">
            {rendermore && (
              <button
                onClick={onClick2}
                className="bg-black  font-medium py-2 px-4 rounded-md hover:bg-gray-500 hover:cursor-pointer"
              >
                {button1 == "Remove" ? (
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )}
            <button
              onClick={onClick1}
              className="bg-black  text-white font-medium py-2 px-4 rounded-md hover:bg-gray-500 hover:cursor-pointer"
            >
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
                  d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
