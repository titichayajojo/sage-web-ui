import Image from "next/image";
import backArrow from "../../images/BackArrow.png";
import map from "../../images/Map.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Auth from "@/lib/api/auth";
import Select from "react-select";
import { getCookie } from "@/lib/cookie";
import Map from "../../components/Map";
export default function RequestListBox(props) {
  const router = useRouter();
  const { caseInfo, medInfo, hospitalId, jobId, location } = props;
  console.log("job id: ", jobId);
  console.log("caseInfo: ", caseInfo);
  console.log("medInfo: ", medInfo);
  const [selectedStaff, setSelectedStaff] = useState();
  let staffs = [
    {
      value: null,
      label: "unassigned",
    },
  ];
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
  const acceptCase = async (id, receiver) => {
    const token = getCookie("token");
    if (receiver) {
      const res = await Auth.acceptCase({
        body: {
          jobId: id,
          receiverUid: receiver,
          round: "1",
        },
        token: token,
      });
      router.push("/RequestList");
    } else {
      alert("You forgot to assign a paramedic");
    }
    console.log("selected staff: ", id, receiver);
  };
  useEffect(() => {
    getStaff();
  }, []);
  const [staffOption, setStaffOption] = useState(staffs);
  return (
    <div className="flex flex-1 justify-center">
      <div className="bg-header-light/20 rounded-2xl mx-10 mt-10 pr-10 pb-10 mb-10 w-screen">
        <div className="flex mt-5">
          <Image
            src={backArrow}
            alt="arrowImg"
            className="inline-block ml-2"
            onClick={() => router.back()}
          />
          <div className="text-header-dark text-2xl">Back</div>
        </div>

        <table className="table-auto ml-10 mt-5 text-xl text-grey">
          <tbody>
            <tr className="align-top">
              <td className="pl-7 w-3/5">
                <th className="text-header-light text-3xl text-left">
                  Requester Name: {medInfo.medicalInformation.name}
                </th>
                <div className="mt-5 underline">Contact Number:</div>{" "}
                {caseInfo.contactNumber}
                <div className="mt-5 underline">Emergency contact:</div>
                <div>
                  {medInfo.medicalInformation.powerOfAttorneyName} (
                  {medInfo.medicalInformation.powerOfAttorneyPhoneNumber})
                </div>
                <div className=" mt-5 underline">Medical information:</div>
                <div>
                  congenital disease:{" "}
                  {medInfo.medicalInformation.congenitalDisease}
                </div>
                <div>
                  Regular medication: {medInfo.medicalInformation.regularMed}
                </div>
                <div>
                  Allergies:
                  {medInfo.medicalInformation.allergies.map((s) => (
                    <div>- {s}</div>
                  ))}
                </div>
                <div>DNR: {medInfo.medicalInformation.DNRStatus}</div>
                <div>
                  Organ donor:{" "}
                  {medInfo.medicalInformation.organDonour.toString()}
                </div>
                <div className="mt-5 underline">Insurance: </div>
                <div> Provider: {medInfo.insurance.provider} </div>
                <div> Insurance plan: {medInfo.insurance.plan} </div>
                <div>
                  {" "}
                  Insurance number: {medInfo.insurance.insuranceNumber}{" "}
                </div>
                <div>
                  {" "}
                  Insurance expiry date: {medInfo.insurance.expirationDate}{" "}
                </div>
                <div className="mt-5 underline">Symptoms:</div>
                {caseInfo.symptoms.map((s) => (
                  <div>- {s}</div>
                ))}
                <div className="mt-5 underline">Other information: </div>
                <div>{caseInfo.otherInformation}</div>
                <div className="mt-5 my-2 underline">Attached image(s): </div>
                
              </td>
              <td>
                <div className="flex flex-row place-content-between">
                  <div className="grow">
                    <Select
                      options={staffOption}
                      placeholder="Select assignee"
                      value={selectedStaff}
                      onChange={setSelectedStaff}
                      isSearchable={true}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      className="rounded-xl bg-btn-green px-12 py-1 text-white ml-5"
                      onClick={() => acceptCase(jobId, selectedStaff)}>
                      Accept
                    </button>
                  </div>
                </div>
                <div className="mt-10 flex justify-center item-center">
                <ImageList
                  // sx={{ width: 800, height: 250 }}

                >
                  {caseInfo.attachedImages.map((item) => (
                    <ImageListItem key={item}>
                      {item && (
                        <img
                          src={`https://healthcare-finalproject.s3.ap-southeast-1.amazonaws.com/${item}`}
                          // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          // alt={item.title}
                          loading="lazy"
                        />
                      )}
                    </ImageListItem>
                  ))}
                </ImageList>
                  {/* <Map locations={[]} hospitalLocation={{lat: parseFloat(location.emergencyCaseLatitude), lng: parseFloat(location.emergencyCaseLongitude)}}/> */}
                </div>
                <div
                  className="ml-auto mt-1 flex justify-center hover:underline"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/${parseFloat(
                        location.hospitalLatitude
                      )},${parseFloat(location.hospitalLoingitude)}/${
                        location.emergencyCaseLatitude
                      },${location.emergencyCaseLongitude}`
                    )
                  }
                >
                  Location: {location.emergencyCaseLatitude},{" "}
                  {location.emergencyCaseLongitude}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
