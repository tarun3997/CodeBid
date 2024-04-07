export default function MessageList({name,image, onClick, lastMessageTime,lastMessage}) {
    
    return <div className='flex justify-between items-center cursor-pointer hover:bg-slate-300 p-3 rounded-lg' onClick={onClick}>
    <div className='w-11 h-11 rounded-full bg-blue-200'
    style={{
        backgroundImage: `url(http://localhost:4000${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
    <div className='flex flex-col w-5/6'>
        <div className='flex justify-between items-center'>
        <span className='overflow-ellipsis font-bold'>{name}</span>
        <span className='text-xs'>{lastMessageTime}</span>
        </div>
        <span className=' text-xs whitespace-nowrap overflow-hidden truncate'>{lastMessage}</span>
    </div>
</div>
}