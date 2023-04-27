import SageNavBar from "../../components/SageNavBar";
import RequestListBox from "@/components/RequestListBox";
import withAuth from "@/lib/helpers";
import { useState, useEffect } from "react";
import { getCookie } from "@/lib/cookie";
import Auth from "@/lib/api/auth";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import map from "../../images/Map.png";
function RequestList() {
  const [allJobs, setAllJobs] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [cases, setCases] = useState([]);
  //  let casesTemp = []
  //   const getOrderData = async (jobId) => {
  //     const token = getCookie("token");
  //     const res = await Auth.getAllEmergencyCases({
  //       params: { id : jobId},
  //       token:token,
  //     });
  //     casesTemp.push(res.data)
  //   };
  useEffect(() => {
    try {
      const getUserRole = async () => {
        const token = getCookie("token");
        console.log(token);
        const user = await Auth.getUserProfile({
          token: token,
        });
        setHospitalId(user.data.data.user.hospitalId);
      };
      getUserRole();

      if (hospitalId != null) {
        const q = query(
          collection(db, "jobs"),
          where("users", "array-contains", hospitalId),
          where("status", "==", "finding")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const jobs = [];
       
          querySnapshot.forEach((doc) => {
            jobs.push(doc.data().jobId);
          });
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
      <SageNavBar />

      <RequestListBox jobIdList={allJobs} hospitalId={hospitalId}/>

      {/* <div className="bg-header-light/20 rounded-2xl flex justify-center mx-7">
        <div className="bg-white rounded-2xl w-3/5 my-5 ml-5 overflow-y-auto h-screen">
          <table className="table-fixed w-11/12 h-fit m-5 text-left text-grey">
            <thead>
              <tr>
                <th>Requester name</th>
                <th>Symptoms</th>
                <th>Distance</th>
                <th>Assignee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody><RequestListBox jobIdList={allJobs} /></tbody>
          </table>
        </div>
        <div className="w-2/5 m-5 min-h-screen flex justify-center item-center">
          <Image src={map} alt="mapImg" height="100%"></Image>
        </div>
      </div> */}
    </div>
  );
}
export default withAuth(RequestList);
