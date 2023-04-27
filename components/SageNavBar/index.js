import Image from "next/image";
import userPic from "../../images/Vector.png";
import arrow from "../../images/Arrow.png";
import { useRouter } from "next/router";
import {  getAuth, signOut } from "firebase/auth";
export default function  SageNavBar(props) {
  const router = useRouter();
  function handleLogout() {
    const auth = getAuth();
    auth
      .signOut()
      .then(function () {
        router.push("/Login");
        alert("Logout successful");
      })
      .catch(function (error) {
        alert("OOps something went wrong check your console");
        console.log(err);
      });
  }
  return (
    <div className="px-10 py-7 font-sans text-3xl font-normal flex">
      <div className="text-header-dark">SAGE</div>
      <div className="text-base ml-auto mt-2.5 text-header-light"
      onClick={()=>router.push(`/RequestList`)}>
        Ambulance requests
      </div>
      <div className="text-base ml-auto mt-2.5 text-header-light"
      onClick={()=>router.push(`/RequestListStatus`)}>
        Ambulance status
      </div>
      <div className="text-base mr-10 ml-auto mt-0">
        <button className="text-base border-header-dark border-2 rounded-2xl text-header-light inline-block p-2"
        onClick={handleLogout}>
          <Image src={userPic} alt="userImg" className="inline-block mr-2" />
          Pattarin U.
          <Image src={arrow} alt="arrowImg" className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
}
