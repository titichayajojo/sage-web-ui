import Image from "next/image";
// import map from "../../images/Map.png";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/cookie";
import Auth from "@/lib/api/auth";
import map from "../../images/Map.png";
import Select from "react-select";
export default function RequestListBox(props) {
  const [userData, setUserData] = useState("");
  const [allCases, setAllCases] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const { jobIdList, hospitalId } = props;

  let staffs = [{
    value:null,
    label: "unassigned",
  }];

  const getData = async () => {
    console.log("job id: ", jobIdList);
    let cases = [];

    if (jobIdList.length) {
      for (let i = 0; i < jobIdList.length; i++) {
        const c = await getOrderData(jobIdList[i]);
        cases.push(c);
      }

      setAllCases(cases);
    }
  };
  const getStaff = async () => {
    const res = await Auth.getMedicalStaff({
      params: { id: hospitalId },
    });
    if (staffs.length == 1 && res.data) {
      console.log("here");

      for (let i = 0; i < res.data.data.length; i++) {
        const staff = {
          value: res.data.data[i].uid,
          label: res.data.data[i].name,
        };
        staffs.push(staff);
      }
      console.log("staff: ", staffs);
      setStaffOption(staffs);
    }
  };
  const acceptCase = async (id, receiver) =>{
    const token = getCookie("token");
    console.log(id,receiver.value)
    const res = await Auth.acceptCase({
      body:{
        jobId:id,
        receiverUid:receiver,
        round:"3",
      },
      token: token,
    })
  }

  useEffect(() => {
    getData();
    getStaff();
  }, [jobIdList]);
  const getOrderData = async (jobId) => {
    const token = getCookie("token");
    const res = await Auth.getAllEmergencyCases({
      params: { id: jobId },
      token: token,
    });
    return res.data;
  };
  const [staffOption, setStaffOption] = useState(staffs);
  console.log("opyion: ", staffOption);
  return (
    <div>
      <div className="bg-header-light/20 rounded-2xl flex justify-center mx-7">
        <div className="bg-white rounded-2xl w-3/5 my-5 ml-5 overflow-y-auto h-screen">
          <table className="table-fixed w-11/12 h-fit m-5 text-left text-grey">
            <thead>
              <tr>
                <th className="px-4 py-2">Requester</th>
                <th className="px-4 py-2">Symptoms</th>
                <th className="px-2 py-2 w-20">Distance</th>
                <th className="px-4 py-2">Assignee</th>
                <th className="px-3 py-2 w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCases.map((i, index) => (
                <tr key={index} className="h-20">
                  <td className="border px-4 py-2">{i.data.name}</td>
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
                        className="bg-btn-green rounded-2xl px-2 py-1  text-white"
                        style={{ backgroundColor: "green !important" }}
                        onClick={()=>acceptCase(jobIdList[index],allCases[index].assignee)}
                      >
                        Accept
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-2/5 m-5 min-h-screen flex justify-center item-center">
          <Image src={map} alt="mapImg" height="100%"></Image>
        </div>
      </div>
    </div>
  );
}
