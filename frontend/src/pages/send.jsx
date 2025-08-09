import { useEffect, useState } from "react";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Button from "../components/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Send() {
  const [queries] = useSearchParams();
  const [userid, setuserid] = useState("");
  const [username, setusername] = useState("");
  const [reciever, setreciever] = useState("");
  const [paymentdone, setsucces] = useState(false);
  const [intransition, settransition] = useState(false);
  const [intransitionx, settransitionx] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleTransactiontoast = () => {
    toast.info("⏳ Transaction initiated...", {
      position: "bottom-right",
      autoClose: true, // stays until you update or dismiss it
      closeOnClick: false,
      draggable: false,
    });
  };

  const handleTransaction = async () => {
    if (!reciever) navigate("/dashboard");
    if (loading) return;
    if (amount <= 0) {
      toast.error("Minimum Transaction is: $ 0.01");
      return;
    }
    setloading(true);
    settransition(true);
    setsucces(null);
    try {
      handleTransactiontoast();
      const response = await axios.post(
        `${apiUrl}/account/transfer`,
        {
          to: userid,
          amount,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.message === "Transfer Successful") {
        {
          toast.success("Tranzaktion succesful");
          setsucces(true);
        }
      } else {
        //toast.clearWaitingQueue();
        toast.error("Transaction failed!");
        setsucces(false);
      }
    } catch (err) {
      toast.error("Transaction failed!");
      setsucces(false);
    }
    setTimeout(() => {
      setloading(false);
      settransition(false);
    }, 1000);
  };

  useEffect(() => {
    setreciever(queries.get("firstname"));
    setusername(queries.get("username"));
    setuserid(queries.get("userid"));
  }, [queries]);
  // console.log(reciever);
  //=======validating if logged in===========//
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
          toast.error("Not Signed In");
        });
    } catch (error) {
      navigate("/signin");
      toast.error("Not Signed In");
    }
  });
  //=========================================//
  const [amount, setamt] = useState(0);
  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen pt-30 bg-black text-white transition-all">
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 md:min-w-[350px] rounded-2xl bg-black  shadow-sm shadow-white">
          <div className="flex items-center justify-center ">
            <Pheader
              hname={<h1>Send Money</h1>}
              hdescription={"Tranzakt safely ❤️"}
            />
          </div>
          <div className="px-2 py-1 mx-2 font-bold">
            To : <span className="text-green-600 font-bold">{reciever}</span>
          </div>
          <div className="px-2 py-1 mx-2 font-bold">
            Username :{" "}
            <span className="text-green-600 font-bold">{username}</span>
          </div>
          <Field
            fname={"Amount ($)"}
            fplaceholder={"Enter Amount"}
            ftype={"Number"}
            onChange={(e) => {
              settransition(false);
              setsucces(false);
              if ((e.target.value * 100) % 1 == 0) setamt(e.target.value);
            }}
          />
          {!loading && paymentdone && intransitionx && (
            <>
              <div className="m-2 text-green-400 font-bold p-2 text-center">
                Transfer of Amount $ {amount} to {reciever} {" Succesfull"}
              </div>
            </>
          )}
          {!loading && !paymentdone && intransitionx && (
            <>
              <div className="m-2 text-red-400 font-bold p-2 text-center">
                Transfer Failed
              </div>
            </>
          )}

          <Button
            name={
              !loading ? (
                <p>Tranzact !</p>
              ) : (
                <div className="flex justify-center gap-4 items-center">
                  {" "}
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400"
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
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )
            }
            onClick={handleTransaction}
          />
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
        className="absolute top-4 left-4 text-white text-md font-semibold hover:bg-gray-800 pr-2  rounded-md"
      >
        <span className="flex justify-between items-center hover:cursor-pointer">
          <div>
            <svg
              class="w-10 h-10 text-gray-800 dark:text-white"
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
                stroke-width="1.8"
                d="m17 16-4-4 4-4m-6 8-4-4 4-4"
              />
            </svg>
          </div>
          <h1>Go To Dashboard</h1>
        </span>
      </button>
      {intransition && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center"></div>
      )}
    </div>
  );
}
