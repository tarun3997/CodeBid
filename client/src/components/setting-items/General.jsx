import React from "react";
import { Input } from "../input";

const General = () => {
  return (
    <div className="p-4">
      <div>Username</div>
      <Input />
      <div className="mt-4">
        <div>Email</div>
        <Input />
      </div>
      <div className="h-6 w-[100%] flex justify-center ">
        <button className="h-6 w-[100px] bg-slate-200 mt-6 rounded-2xl ">
          Save
        </button>
      </div>
    </div>
  );
};

export default General;