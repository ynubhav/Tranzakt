import Homenav from "../components/homenavbar";

export default function Features(){

    return(
        <>
        <Homenav pfplink={'johnpork.jpeg'}/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Features of Tranzakt</h1>
            <ul className="list-disc list-inside text-lg max-w-2xl space-y-2">
                <li>Seamless Money Transfers: Send and receive money instantly with just a few taps.</li>
                <li>Expense Tracking: Monitor your spending habits with detailed analytics and reports.</li>
                <li>User Profile Management: Easily update your personal information and preferences.</li>
                <li>Secure Transactions: State-of-the-art security measures to protect your financial data.</li>
                <li>Intuitive Interface: User-friendly design for a smooth and enjoyable experience.</li>
            </ul>
        </div>

        <footer className="py-12 text-center bg-black text-xs text-slate-500 border-t border-white/10">
        © {new Date().getFullYear()} Tranzakt. No data‑selling nonsense. Built with ❤️ in India.
      </footer>
        </>
        
    )
}