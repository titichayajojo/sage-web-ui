import Image from "next/image";
import backArrow from "../../images/BackArrow.png";
import map from "../../images/Map.png";

export default function RequestListBox(props) {
  return (
    <div className="flex justify-center item-center">
      <div className="bg-header-light/20 rounded-2xl mx-7 pr-10 w-screen">
        <div className="flex">
          <Image src={backArrow} alt="arrowImg" className="inline-block ml-2" />
          <div className="mt-0.5 text-header-dark text-base">Back</div>
        </div>

        <table className="table-auto ml-10 text-base text-grey">
          <thead>
            <tr className="h-20 ">
              <th className="text-header-light text-2xl text-left w-3/5">
                Request ID: 216462
              </th>
              <th className="w-2/5">
                <button className="rounded-xl bg-btn-red px-12 py-1 text-white ml-auto">
                  Decline
                </button>
                <button className="rounded-xl bg-btn-green px-12 py-1 text-white ml-5">
                  Accept
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              <td className="pr-10">
                <div className="my-5">
                  Caller information: Pattarin urapevatcharewan (Patient)
                </div>
                <div className="my-5">Number of Patient: 1</div>
                <div className="my-5">Gender: Female</div>
                <div className="my-5">
                  Symptoms: Road accident, severe bloodloss, head/spinal injury
                </div>
                <div>Medical and insurance information:</div>
                <div>congenital disease: High blood pressure</div>
                <div>Regular medication: Blood pressure control</div>
                <div>Allergies: None</div>
                <div>DNR: Yes</div>
                <div>Organ donor: No</div>
                <div>Insurance: AIA 37483267 (Health protection)</div>
                <div className="my-5">More information: </div>
              </td>
              <td>
                <div className="ml-auto flex justify-center">
                  <Image src={map} alt="arrowImg"></Image>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="flex justify-center">
                Location: 111 Sathorn Road Bangkok Thailand
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
