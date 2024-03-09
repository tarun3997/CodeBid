import { BsFillEyeFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

export default function ProjectCard({project}) {
    return <div className="w-[30%] flex min-h-72 bg-[#393b70] rounded-xl">
    <div className="w-[85%] min-h-72">
      
    </div>
    <div className="w-[15%] min-h-72 flex text-white text-xs justify-between items-center flex-col pt-5 pb-5">
      <div>
      <div className="flex flex-col items-center mb-4">
        <AiFillHeart className="Icon-Style" />
        <span>2.98k</span>
      </div>
      <div className="flex flex-col items-center mb-4">
        <FaCommentDots className="Icon-Style" />
        <span>2.98k</span>
      </div>
      <div className="flex flex-col items-center">
        <BsFillEyeFill className="Icon-Style" />
        <span>298k</span>
      </div>
      </div>
      <div className="flex flex-col items-center">
      <div
      className="w-8 h-8 rounded-full cursor-pointer"
    //   style={{
    //     backgroundImage: `url(${profileImage})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
      >

      </div>
      <span className="mt-1 text-center text-xs">{project.name}</span>
      </div>
    </div>
  </div>
}