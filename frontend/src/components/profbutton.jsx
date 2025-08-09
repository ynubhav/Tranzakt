export default function ProfButton({ name, onClick }) {
  return (
    <div className="flex w-full">
      <button
        onClick={onClick}
        className="flex items-center gap-3 w-full rounded-lg py-2 px-5 text-white text-left mx-5 hover:bg-gray-700/80 transition-colors duration-200 hover:cursor-pointer"
      >
        {name}
      </button>
    </div>
  );
}
