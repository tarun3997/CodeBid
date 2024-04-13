import React from "react";

const Delete = () => {
  return (
    <div className="flex justify-center mt-20">
      <div className="h-[320px] w-[220px]  bg-white shadow-2xl rounded-sm">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/454/855/small/speech-bubble-with-bye-word-social-media-doodle-style-icon-free-vector.jpg"
            className="h-40  w-[250px] rounded-t-sm"
            alt="hii"
          />
        <div className=" font-bold text-black p-2  ">
          We're sorry to see you go
        </div>
        <div className="text-[7px] text-black p-2">
          If you’d like to reduce your email notifications, you can disable them
          here or if you just want to change your username, you can do that
          here.
          <br />
          Be advised, account deletion is final. There will be no way to restore
          your account.
        </div>
        <div className="flex">
          <div className="h-6 w-20  px-2 py-1 pt border border-slate-200 bg-black text-white text-[12px] flex items-center mt-2 mx-1  rounded-r-full rounded-l-full">
            Nevermind
          </div>
          <div className="h-6 w-32  px-3 py-1 border border-slate-200 bg-white text-[12px] flex  items-center mt-2 mx-1  rounded-r-full rounded-l-full ">
            Delete my Account
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;