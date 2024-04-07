export default function MessageUi({text, isOwnMessage, profile}) {
    return <div className="w-full flex flex-col ">
    <div className={`flex gap-2 mx-4 mb-2 ${isOwnMessage ?  `justify-end` : `justify-start`}`}>
      {!isOwnMessage ? <div
        className="w-9 h-9 rounded-full "
        style={{
          backgroundImage: `url(http://localhost:4000${profile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div> : <div />}
      <div className="bg-[#23262f] p-2 rounded-tr-md rounded-br-md rounded-bl-md max-w-80 text-white">{text}</div>
      {isOwnMessage ? <div
        className="w-9 h-9 rounded-full "
        style={{
          backgroundImage: `url(http://localhost:4000${profile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div> : <div />}
    </div>
  </div>
}