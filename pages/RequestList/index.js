import Select from "react-select";
import SageNavBar from "../../components/SageNavBar";
import RequestListBox from "@/components/RequestListBox";
import withAuth from "@/lib/helpers";
import { useState, useEffect } from "react";
import { getCookie } from "@/lib/cookie";
import Auth from "@/lib/api/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/router";
function RequestList() {
  const [allJobs, setAllJobs] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [hospitalName, setHospitalName] = useState(null);
  const [allCases, setAllCases] = useState([]);
  const [caseStatus, setCaseStatus] = useState([]);
  const router= useRouter();

  const getData = async () => {
    console.log("job id: ", allJobs);
    const token = getCookie("token");
    const cases = await Promise.all(
      allJobs.map(async (jobId) => {
        const res = await Auth.getAllEmergencyCases({
          params: { id: jobId },
          token: token,
        });
        return res.data;
      })
    );
    setAllCases(cases);
  };
  let staffs = [
    {
      value: null,
      label: "unassigned",
    },
  ];
  const [staffOption, setStaffOption] = useState(staffs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("token");
        const user = await Auth.getUserProfile({
          token: token,
        });
        const hospitalId = user.data.data.user.hospitalId;
        setHospitalId(hospitalId);
        setHospitalName(user.data.data.hospital.name);

        const res = await Auth.getMedicalStaff({
          params: { id: hospitalId },
        });
        if (staffs.length == 1 && res.data) {
          console.log("here:",res.data);
    
          for (let i = 0; i < res.data.data.length; i++) {
            const staff = {
              value: res.data.data[i].uid,
              label: res.data.data[i].name,
            };
            console.log("staff here:",staff)
            staffs.push(staff);
          }
          
          setStaffOption(staffs);
        }

        const q = query(
          collection(db, "jobs"),
          where("users", "array-contains", hospitalId),
          where("status", "==", "finding")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const jobs = [];
          const statuses = [];
          querySnapshot.forEach((doc) => {
            const jobData = doc.data();
            const jobId = jobData.jobId;
            const jobStatus = jobData.status;
            jobs.push(jobId);
            statuses.push(jobStatus)
          });
          setAllJobs(jobs);
          setCaseStatus(statuses)
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allJobs.length > 0) {
      getData();
    }
  }, [allJobs]);

  useEffect(() => {
    if (allCases.length > 0) {
      console.log("allCases:", allCases);
      console.log("cases status:", caseStatus)
    }
  }, [allCases]);

  console.log("allJobs:", allJobs);
  const acceptCase = async (id, receiver) => {
    const token = getCookie("token");
    console.log("receiver: ",receiver.value)
    if (receiver.value) {
      const res = await Auth.acceptCase({
        body: {
          jobId: id,
          receiverUid: receiver,
          round: "1",
        },
        token: token,
      });
    }else{
      alert("You forgot to assign a paramedic");
    }
  };

  return (
    <div>
      {hospitalName && <SageNavBar name={hospitalName} />}
      {/* {hospitalId && <RequestListBox jobIdList={allJobs} hospitalId={hospitalId} />} */}
      <div className="bg-header-light/20 rounded-2xl flex justify-center mx-7 mb-10">
        <div className="bg-white rounded-2xl w-3/5 m-10  h-screen overflow-y-auto">
          <table className="table-fixed  h-fit m-5 text-left text-grey text-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Requester</th>
                <th className="px-4 py-2">Symptoms</th>
                <th className="px-2 py-2 w-25">Distance</th>
                <th className="px-4 py-2">Assignee</th>
                <th className="px-3 py-2 w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCases.map((i, index) => {
                if (caseStatus[index] === "finding") {
                  return (
                    <tr key={index} className="h-20">
                      <td
                        onClick={() =>
                          router.push(
                            `/RequestDetails?id=${i.data.emergencyCaseId}&jobId=${allJobs[index]}`
                          )
                        }
                        className="border px-4 py-2"
                      >
                        <p className=" hover:underline">{i.data.name}</p>
                      </td>
                      <td className="border px-4 py-2">
                        {i.data.symptoms.map((s) => (
                          <div>{s}</div>
                        ))}
                      </td>
                      <td className="border px-2 py-2">{i.data.distance} km</td>
                      <td className="border px-4 py-2">
                        <Select
                          options={staffOption}
                          placeholder="Select assignee"
                          value={i.assignee}
                          onChange={(selectedOption) => {
                            const updatedCases = [...allCases];
                            updatedCases[index].assignee = selectedOption;
                            setAllCases(updatedCases);
                          }}
                          isSearchable={true}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center">
                          <button
                            className="bg-btn-green rounded-2xl px-3 py-1  text-white"
                            style={{ backgroundColor: "green !important" }}
                            onClick={() =>
                              acceptCase(
                                allJobs[index],
                                allCases[index].assignee
                              )
                            }
                          >
                            Accept
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Render nothing for cases with status other than "finding"
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="w-2/5 mt-10  min-h-screen flex justify-center item-center">
          {/* <Image src={map} alt="mapImg" height="100%" className="mb-10"></Image> */}
        </div>
      </div>
    </div>
  );
}

export default withAuth(RequestList);

// import SageNavBar from "../../components/SageNavBar";
// import RequestListBox from "@/components/RequestListBox";
// import withAuth from "@/lib/helpers";
// import { useState, useEffect } from "react";
// import { getCookie } from "@/lib/cookie";
// import Auth from "@/lib/api/auth";
// import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Image from "next/image";
// import map from "../../images/Map.png";
// function RequestList() {
//   const [allJobs, setAllJobs] = useState([]);
//   const [hospitalId, setHospitalId] = useState(null);
//   const [hospitalName, setHospitalName] = useState(null);
//   const [allCases, setAllCases] = useState([]);
//   let staffs = [
//     {
//       value: null,
//       label: "unassigned",
//     },
//   ];
//   const getData = async () => {
//     console.log("job id: ", allJobs);
//     let cases = [];
//     const getOrderData = async (jobId) => {
//       const token = getCookie("token");
//       const res = await Auth.getAllEmergencyCases({
//         params: { id: jobId },
//         token: token,
//       });
//       return res.data;
//     };
//     if (allJobs.length) {
//       for (let i = 0; i < allJobs.length; i++) {
//         const c = await getOrderData(allJobs[i]);

//         cases.push(c);
//       }

//       setAllCases(cases);
//     }
//   };

//   const [staffOption, setStaffOption] = useState(staffs);

//   useEffect(() => {
//     try {
//       const getUserRole = async () => {
//         const token = getCookie("token");
//         console.log(token);
//         const user = await Auth.getUserProfile({
//           token: token,
//         });
//         setHospitalId(user.data.data.user.hospitalId);
//         setHospitalName(user.data.data.hospital.name);
//       };
//       const getStaff = async () => {
//         const res = await Auth.getMedicalStaff({
//           params: { id: hospitalId },
//         });
//         if (staffs.length == 1 && res.data) {
//           console.log("staff here:", res.data);

//           for (let i = 0; i < res.data.data.length; i++) {
//             const staff = {
//               value: res.data.data[i].uid,
//               label: res.data.data[i].name,
//             };
//             staffs.push(staff);
//           }

//           setStaffOption(staffs);
//         }
//       };
//       getUserRole();
//       if (hospitalId != null) {
//         getStaff();
//         const q = query(
//           collection(db, "jobs"),
//           where("users", "array-contains", hospitalId),
//           where("status", "==", "finding")
//         );
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//           const jobs = [];

//           querySnapshot.forEach((doc) => {
//             jobs.push(doc.data().jobId);
//           });
//           console.log("JOBS=",jobs)
//           setAllJobs(jobs);
//           getData();
//         });

//         // setCases(casesTemp)
//         // console.log("case: ", JSON.stringify(casesTemp) )
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, [hospitalId]);
//   console.log("JOBS=",allJobs)
//   console.log("all Cases: ", allCases);
//   return (
//     <div>
//       {hospitalName && <SageNavBar name={hospitalName} />}
//       {/* {hospitalId&&<RequestListBox jobIdList={allJobs} hospitalId={hospitalId}/>} */}

//       {allCases}
//     </div>
//   );
// }
// export default withAuth(RequestList);
