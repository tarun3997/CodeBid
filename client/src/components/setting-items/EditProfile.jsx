import React from "react";
import { Input } from "../input";

const EditProfile = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="h-12  w-12 flex justify-center items-center bg-green-900 text-white rounded-full text-xl">S</div>
        <div className="h-8 w-40 border border-slate-500  rounded-r-full rounded-l-full px-2 py-1"> Upload new project</div>
        <div className="h-8 w-30 bg-slate-100 rounded-r-full rounded-l-full px-2 py-1">delete</div>
      </div>
      <div className="pt-2">
        <div className=" ">Name</div>
        <Input/>
      </div>
      <div>
        <div>Location</div>
        <Input/>
      </div>
      <div className="pt-2">
        <div>Bio</div>
        <Input/>
      </div>
      <div className="h-8 w-16 bg-slate-200 rounded-r-full rounded-l-full px-3 py-1 flex mt-4">Save</div>
    </div>
  );
};

export default EditProfile;