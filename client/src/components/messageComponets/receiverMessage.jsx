export default function ReceivedMessage({receivedMessage}) {
    return <div className="flex gap-2 ml-4 mb-2">
    <div className="w-9 h-9 rounded-full bg-blue-200"></div>
    <div className="bg-[#23262f] p-2 rounded-tr-md rounded-br-md rounded-bl-md max-w-80 text-white">{receivedMessage}</div>
    </div>
}