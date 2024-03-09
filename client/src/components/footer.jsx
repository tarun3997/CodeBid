import bg from "../../public/bg2.jpg";


export default function Footer() {
    return <footer>
        <div className="w-full h-64 flex justify-between pt-4 pb-4 flex-col items-center"style={{
            backgroundImage: `url(${bg.src}) `,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}>
            <div className="flex justify-between items-start w-7/12">
                
                <div className="column text-white flex flex-col">
                    <span className="text-4xl font-bold font-Play">Contat with Us</span>
                    <span className="text-sm  font-Play">Do you need any kind of help please contact with us.</span>
                </div>
                <form className="flex">
                        <input className="[outline:none] bg-[transparent] relative rounded-xl border-solid border-gray-500 border text-white  hover:cursor-text  w-80 p-3" type="email" placeholder="Email here" required />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl ml-2">Submit</button>
                    </form>
            </div>
            <div className="flex justify-evenly w-2/12">
                <CustomSocialCircle alt={"Facebook"} src={"https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png"}/>
                <CustomSocialCircle alt={"Instagram"} src={"https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png"}/>
                <CustomSocialCircle alt={"Github"} src={"https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/71-github-512.png"}/>
                <CustomSocialCircle alt={"Twitter"} src={"https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-512.png"}/>
            </div>
                <span className="text-cc-color text-sm">Copyright @2024 CodeBid - All rights reserved </span>
        </div>
    </footer>
    
}

function CustomSocialCircle({src, alt}) {
    return <div className="w-[50px] h-[50px] rounded-full bg-gray box-border overflow-hidden border-[1px] border-solid border-rose-400 bg-[#181b26]">
        <img src={src} alt={alt} />
    </div>
}