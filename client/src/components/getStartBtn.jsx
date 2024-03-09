export default function GetStartButton({getStartedClick}) {
    return <div
    className="w-36 h-9 rounded-3xl flex justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer"
    onClick={getStartedClick}
  >
    <span className="text-white font-Archivo font-bold">
      Get Started
    </span>
  </div>
}