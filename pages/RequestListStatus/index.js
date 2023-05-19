import SageNavBar from "../../components/SageNavBar";
import RequestListStatusBox from "@/components/RequestListStatusBox";
import withAuth from "@/lib/helpers";
import { useState, useEffect } from "react";
import { getCookie } from "@/lib/cookie";
import Auth from "@/lib/api/auth";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import map from "../../images/Map.png";
function RequestListStatus() {
  const [allJobs, setAllJobs] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [hospitalName, setHospitalName] = useState(null);
  useEffect(() => {
    try {
      const getUserRole = async () => {
        const token = getCookie("token");
        console.log(token);
        const user = await Auth.getUserProfile({
          token: token,
        });

        setHospitalId(user.data.data.user.hospitalId);
        setHospitalName(user.data.data.hospital.name)

        console.log("hospitalId: ",hospitalId)
      };
      getUserRole();

      if (hospitalId != null) {
        
        const q = query(
          collection(db, "jobs"),
          where("users", "array-contains", hospitalId),
          where("status", "in", ["doing", "done"])
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const jobs = [];
       
          querySnapshot.forEach((doc) => {
            jobs.push(doc.data().jobId);
          });
          console.log("jobssss: ", jobs)
          setAllJobs(jobs);
        });
        // setCases(casesTemp)
        // console.log("case: ", JSON.stringify(casesTemp) )
      }
    } catch (error) {
      console.error(error);
    }
  }, [hospitalId]);
  return (
    <div>
      {hospitalName&&<SageNavBar name={hospitalName}/>}
      {hospitalId&&allJobs&&<RequestListStatusBox jobIdList={allJobs} hospitalId={hospitalId}/>}
    </div>
  );
}
export default withAuth(RequestListStatus)
