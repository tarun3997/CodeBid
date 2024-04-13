import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect } from "react";
import moment from 'moment';

import { FaBell } from "react-icons/fa";
export default function Notification({onClick, notification}) {
  return (
    <div>
      <Dropdown placement="bottom-center">
        <DropdownTrigger>
          <div className="bg-[#393b70] w-10 h-10 flex justify-center items-center rounded-lg cursor-pointer" onClick={onClick}>
            <FaBell className="fill-white" />
          </div>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Static Actions" className="w-[400px] max-h-unit-7xl custom-scrollbar overflow-auto">
          {notification.map((data, index)=>(
          <DropdownItem key={index}>
            <LikeNotificationUI content={data.content} profile={data.profileUrl} timestamp={data.timestamp} postUrl={data.postImage}/>
          </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

function LikeNotificationUI({profile, content,timestamp, postUrl}) {
  const difference = moment().diff(moment(timestamp));
  const durationInSeconds = moment.duration(difference).asSeconds();
  let displayText = '';
  if (durationInSeconds < 60) {
    displayText = `${Math.floor(durationInSeconds)} sec ago`;
  } else if (durationInSeconds < 3600) {
    displayText = `${Math.floor(durationInSeconds / 60)} min ago`;
  } else if (durationInSeconds < 86400) {
    displayText = `${Math.floor(durationInSeconds / 3600)} hr ago`;
  } else {
    displayText = `${Math.floor(durationInSeconds / 86400)} days ago`;
  }

  return (
    <div className="flex justify-between items-center gap-6 ">
      <div className="flex items-center gap-2 ">
        <div>
        <Avatar
          src={`http://localhost:4000${profile}`}
          
          size="md"
        />
        </div>
        <div className="gap-2 flex items-center ">
          {/* <span className="font-bold text-medium">tarun </span> */}
          <span className="text-wrap ">
          {content}</span>
          <span className="text-xs">{displayText}</span>
        </div>
      </div>
      <div>
      <Avatar
        radius="sm"
        size="md"
        src={`http://localhost:4000/${postUrl}`}
      />
      </div>
    </div>
  );
}
