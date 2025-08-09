import { useEffect, useRef, useState } from "react";
import Navbar from "../components/dashnavbar";
import axios from "axios";
import Searchedusers from "../components/results";
import { data, useNavigate } from "react-router-dom";
import Homenav from "../components/homenavbar";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard() {
  const [filter, setfilter] = useState("");
  const [balance, setbalance] = useState(0);
  const [firstname, setfirstname] = useState("User");
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [filteredusers, setfilteredusers] = useState([]);
  const [friendarr, setfriendarr] = useState([]);
  const dbdfilter = useDebounce(filter);
  const [reload, setreload] = useState(true);

  useEffect(() => {
    try {
      const x = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setfirstname(response.data.firstname);
          setbalance(response.data.balance);
          setloading(false);
          toast.success("fetched friends");
        })
        .catch((err) => {
          setloading(false);
          navigate("/signin");
        });
    } catch (error) {
      setloading(false);
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    try {
      const x = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/v1/user/friends?action=find",
          {},
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setfriendarr(response.data.friends);
        });
    } catch (error) {
      toast.error("couldn't fetch friends");
    }
  }, [reload]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      .then((response) => {
        setfilteredusers(response.data.users);
      });
  }, [dbdfilter]);

  return (
  <div className="bg-black min-h-screen">
    <div className="fixed top-0 left-0 right-0 bg-white shadow">
      <Homenav pfplink={"johnpork.jpeg"} />
    </div>
    {loading ? (
      <div className="flex justify-center pt-20">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
      <div className="px-2 pb-2 bg-black min-h-screen pt-20 transition">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-2 text-lg sm:text-xl font-bold text-gray-400">
            BALANCE: <span className="text-white">${balance.toFixed(2)}</span>
          </div>
          <div className="p-2 text-lg sm:text-xl font-bold text-gray-400">
            Search Users
          </div>
          <div className="mx-0 sm:mx-4">
            <input
              onChange={(e) => {
                setfilter(e.target.value);
              }}
              type="text"
              placeholder="Search Users ... "
              className="w-full rounded-xl border-2 text-gray-400 border-slate-500 p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="max-h-64 overflow-y-auto mt-2">
            {filteredusers.map((data, index) => {
              const firstname = data.firstname;
              const lastname = data.lastname;
              const username = data.username;
              const friendid = data._id;
              if (index > 9) return null;
              return (
                <Searchedusers
                  key={index}
                  firstname={firstname}
                  lastname={lastname}
                  username={username}
                  button1={"Add"}
                  onClick1={() => {
                    navigate(
                      "/send?userid=" +
                        data._id +
                        "&firstname=" +
                        firstname +
                        "&username=" +
                        username
                    );
                  }}
                  onClick2={() => {
                    try {
                      axios
                        .post(
                          "http://localhost:3000/api/v1/user/friends?action=add",
                          { userId: friendid, firstname: firstname },
                          {
                            headers: {
                              Authorization: localStorage.getItem("token"),
                            },
                          }
                        )
                        .then((response) => {
                          toast.success(`added ${firstname} to friends`);
                          setreload((c) => !c);
                        });
                    } catch (err) {
                      toast.error("couldn't add friend");
                    }
                  }}
                />
              );
            })}
            {filteredusers.length === 0 && filter && (
              <div className="text-center text-lg sm:text-xl mt-10 font-bold text-gray-400">
                No Matches Found {":("} try using User email
              </div>
            )}
          </div>
          <div className="p-2 text-lg sm:text-xl font-bold text-gray-400">
            Friends
          </div>
          <div className="max-h-76 overflow-y-auto">
            {friendarr.map((data, index) => {
              const firstname = data.firstname;
              const lastname = data.lastname;
              const username = data.username;
              const id = data._id;
              return (
                <Searchedusers
                  key={index}
                  firstname={firstname}
                  lastname={lastname}
                  username={username}
                  button1={"Remove"}
                  onClick1={() => {
                    navigate(
                      "/send?userid=" +
                        data._id +
                        "&firstname=" +
                        firstname +
                        "&username=" +
                        username
                    );
                  }}
                  onClick2={() => {
                    handleremovefriend({ firstname, id, setreload });
                  }}
                />
              );
            })}
            {friendarr.length === 0 && (
              <div className="text-center text-lg sm:text-xl mt-10 font-bold text-gray-400">
                No Friends {":("}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

}

//=========== ==useDebounce==============//
function useDebounce(value) {
  const [dbdvalue, setdbdvalue] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      setdbdvalue(value);
    }, 500);

    return () => {
      clearTimeout(ref.current);
    }; //clears previous effects
  }, [value]);

  return dbdvalue;
}
//============================================//
function handleremovefriend({ firstname, id, setreload }) {
  toast("Are you sure you want to remove?", {
    action: {
      label: "Yes",
      onClick: () => {
        // 🔥 Real logout logic here
        toast.dismiss();
        try {
          axios
            .post(
              "http://localhost:3000/api/v1/user/friends?action=remove",
              { userId: id, firstname: firstname },
              { headers: { Authorization: localStorage.getItem("token") } }
            )
            .then((response) => {
              toast.success(`removed ${firstname} from friends`);
              setreload((c) => !c);
            });
        } catch (err) {
          toast.error("couldn't remove friend");
        }
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
