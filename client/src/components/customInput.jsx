export default function CustomInput({type, onChanges, placeholder}) {
    return <input
    className="[outline:none] bg-[transparent] relative rounded-[15px] border-solid border-white border text-white  hover:cursor-text p-2"
    required
    placeholder={placeholder}
    onChange={onChanges}
    type={type}
    />
}