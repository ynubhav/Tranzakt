import { Check } from "lucide-react";
import Homenav from "../components/homenavbar";

export default function ForgotpasswordPage() {
  return (
    <>
      <Homenav pfplink={"johnpork.jpeg"} />
      <div className="min-h-screen flex flex-col gap-y-6 bg-black text-white">
        <form action="submit">
          <div className="flex flex-col items-center justify-center mb-2">
            <label
              htmlFor="username/email"
              className="text-3xl text-slate-300 font-sans py-4 text-center font-bold"
            >
              Email For Account Password Reset
            </label>
            <p className="text-sm font-bold text-slate-500 max-w-sm text-center px-4 mb-4">
              Once you enter registered mail and click GET RESET PASSWORD, we
              will send a reset password to your email id, Use it as the
              password next time to login and change your password.
            </p>
            <div className="flex min-w-3xs items-center mb-2 border-1 border-white rounded"><input
              type="text"
              placeholder="enter the registered email address"
              className="px-4 py-2 rounded w-full focus:outline-none"
            />
            <Check className="size-6 mx-2 text-green-500"/>
            </div>
            <button className="bg-indigo-600 min-w-3xs rounded px-4 py-2 shadow hover:scale-101 hover:cursor-pointer">
              Get Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
