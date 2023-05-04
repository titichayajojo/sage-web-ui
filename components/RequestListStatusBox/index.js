import { useEffect, useState } from "react";
import { getCookie } from "@/lib/cookie";
import Auth from "@/lib/api/auth";
import { useRouter } from "next/router";
export default function RequestListStatusBox(props) {
  const [allCases, setAllCases] = useState([]);
  const { jobIdList, hospitalId } = props;
  const router = useRouter()
  const getData = async () => {
    console.log("job id: ", jobIdList);
    let cases = [];
    const getOrderData = async (jobId) => {
      const token = getCookie("token");
      const res = await Auth.getAllEmergencyCases({
        params: { id: jobId },
        token: token,
      });

      return res.data;
    };
    if (jobIdList.length) {
      for (let i = 0; i < jobIdList.length; i++) {
        const c = await getOrderData(jobIdList[i]);
        cases.push(c);
      }
      console.log("Status: ", cases);
      setAllCases(cases);
    }
  };
  useEffect(() => {
    getData();
  }, [jobIdList]);

  return (
    <div>
      <div className="bg-header-light/20 rounded-2xl flex justify-center mx-7">
        <div className="bg-white rounded-2xl w-11/12 my-5 ml-5 overflow-y-auto h-screen">
          <table className="table-fixed w-11/12 h-fit m-5 text-left text-grey">
            <thead>
              <tr>
                <th className="px-4 py-2">Requester</th>
                <th className="px-4 py-2">Symptoms</th>
                <th className="px-4 py-2">Distance</th>
                <th className="px-4 py-2">Assignee</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {allCases.map((i, index) => (
                <tr key={index} className="h-20">
                  <td
                    onClick={() =>
                      router.push(
                        `/RequestStatusDetails?id=${i.data.emergencyCaseId}&jobId=${jobIdList[index]}`
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
                  <td className="border px-4 py-2">{i.data.distance} km</td>
                  <td className="border px-4 py-2">
                    {i.data.receiverProfile.medicalInformation.name}
                  </td>
                  <td className="border px-4 py-2">{i.data.job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // <div className="bg-header-light/20 rounded-2xl flex justify-center mx-7">
    //   <div className="bg-white rounded-2xl w-11/12 my-5 ml-5 overflow-y-auto h-screen">
    //     <table className="table-fixed w-11/12 h-fit m-5 text-left text-grey">
    //       <thead>
    //         <tr>
    //           <th>Name</th>
    //           <th>Symptoms</th>
    //           <th>Distance</th>
    //           <th>Assignee</th>
    //           <th>Status</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr className="h-20 text-sm">
    //           <td>
    //             <a href="/RequestDetails">2135622</a>
    //           </td>
    //           <td>10</td>
    //           <td>20km</td>
    //           <td>John Doe (4567456)</td>
    //           <td>Dispatched</td>
    //         </tr>
    //         <tr className="h-20 text-sm">
    //           <td>
    //             <a href="/RequestDetails">2135622</a>
    //           </td>
    //           <td>1</td>
    //           <td>0.5km</td>
    //           <td>John Doe (4567456)</td>
    //           <td>On scene</td>
    //         </tr>
    //         <tr className="h-20 text-sm">
    //           <td>
    //             <a href="/RequestDetails">2135622</a>
    //           </td>
    //           <td>1</td>
    //           <td>0.5km</td>
    //           <td>John Doe (4567456)</td>
    //           <td>Dispatched</td>
    //         </tr>
    //         <tr className="h-20 text-sm">
    //           <td>
    //             <a href="/RequestDetails">2135622</a>
    //           </td>
    //           <td>1</td>
    //           <td>0.5km</td>
    //           <td>John Doe (4567456)</td>
    //           <td>Dispatched</td>
    //         </tr>
    //         <tr className="h-20 text-sm">
    //           <td>
    //             <a href="/RequestDetails">2135622</a>
    //           </td>
    //           <td>1</td>
    //           <td>0.5km</td>
    //           <td>John Doe (4567456)</td>
    //           <td>Dispatched</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}
