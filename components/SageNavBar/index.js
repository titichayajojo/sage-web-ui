import Image from "next/image";
import userPic from "../../images/Vector.png";
import arrow from "../../images/Arrow.png";
export default function SageNavBar(props) {
  return (
    <div className="px-10 py-7 font-sans text-3xl font-normal flex">
      <div className="text-header-dark">SAGE</div>
      <div className="text-base ml-auto mt-2.5 text-header-light">
        Ambulance requests
      </div>
      <div className="text-base ml-auto mt-2.5 text-header-light">
        Ambulance status
      </div>
      <div className="text-base mr-10 ml-auto mt-0">
        <button className="text-base border-header-dark border-2 rounded-2xl text-header-light inline-block p-2">
          <Image src={userPic} alt="userImg" className="inline-block mr-2" />
          Pattarin U.
          <Image src={arrow} alt="arrowImg" className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
}
