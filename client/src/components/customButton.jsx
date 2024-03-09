export default function CustomBtn({value}) {
    return <input
    className="[outline:none] bg-blue-500 hover:bg-blue-700 p-2
     relative rounded-[25px] text-white font-bold hover:cursor-pointer"
    type="submit"value={value}
    />
}