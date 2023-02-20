import Image from "next/image";
import map from "../../images/Map.png";

export default function RequestListBox(props) {
  return (
    <div className="bg-header-light/20 rounded-2xl flex justify-center mx-7">
      <div className="bg-white rounded-2xl w-3/5 my-5 ml-5 overflow-y-auto h-screen">
        <table className="table-fixed w-11/12 h-fit m-5 text-left text-grey">
          <thead>
            <tr>
              <th>ID</th>
              <th>No. of patients</th>
              <th>Distance</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-20">
              <td>2135622</td>
              <td>1</td>
              <td>0.5km</td>
              <td>
                <button className="bg-btn-red rounded-2xl mr-3 px-2 py-1 text-white">
                  Decline
                </button>
                <button className="bg-btn-green rounded-2xl px-2 py-1  text-white">
                  Accept
                </button>
              </td>
            </tr>
            <tr className="h-20">
              <td>2135622</td>
              <td>1</td>
              <td>0.5km</td>
              <td>
                <button className="bg-btn-red rounded-2xl mr-3 px-2 py-1  text-white">
                  Decline
                </button>
                <button className="bg-btn-green rounded-2xl px-2 py-1  text-white">
                  Accept
                </button>
              </td>
            </tr>
            <tr className="h-20">
              <td>2135622</td>
              <td>1</td>
              <td>0.5km</td>
              <td>
                <button className="bg-btn-red rounded-2xl mr-3 px-2 py-1  text-white">
                  Decline
                </button>
                <button className="bg-btn-green rounded-2xl px-2 py-1  text-white">
                  Accept
                </button>
              </td>
            </tr>
            <tr className="h-20">
              <td>2135622</td>
              <td>1</td>
              <td>0.5km</td>
              <td>
                <button className="bg-btn-red rounded-2xl mr-3 px-2 py-1  text-white">
                  Decline
                </button>
                <button className="bg-btn-green rounded-2xl px-2 py-1  text-white">
                  Accept
                </button>
              </td>
            </tr>
            <tr className="h-20">
              <td>2135622</td>
              <td>1</td>
              <td>0.5km</td>
              <td>
                <button className="bg-btn-red rounded-2xl mr-3 px-2 py-1  text-white">
                  Decline
                </button>
                <button className="bg-btn-green rounded-2xl px-2 py-1  text-white">
                  Accept
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-2/5 m-5 min-h-screen flex justify-center item-center">
        <Image src={map} alt="mapImg" height="100%"></Image>
      </div>
    </div>
  );
}
