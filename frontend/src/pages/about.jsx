import Homenav from "../components/homenavbar";

export default function AboutPage(){

    return(
        <>
        <Homenav pfplink={'johnpork.jpeg'}/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-4">About Tranzakt</h1>
            <p className="text-lg max-w-2xl text-center mb-6">
                Tranzakt is a cutting-edge financial application designed to simplify your transactions and enhance your financial management experience. Our platform offers a seamless way to send and receive money, track your expenses, and manage your profile with ease.
            </p>
            <p className="text-lg max-w-2xl text-center">
                Built with user experience in mind, Tranzakt leverages modern technologies to provide a secure and efficient service. Whether you're splitting bills with friends or managing your personal finances, Tranzakt is here to help you stay on top of your financial game.
            </p>
        </div>
        <footer className="py-12 text-center bg-black text-xs text-slate-500 border-t border-white/10">
        © {new Date().getFullYear()} Tranzakt. No data‑selling nonsense. Built with ❤️ in India.
      </footer>
        </>
        
    )
}