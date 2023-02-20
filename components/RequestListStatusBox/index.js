export default function RequestListStatusBox(props) {
  return (
    <div className="bg-header-light/20 rounded-2xl flex justify-center mx-7">
      <div className="bg-white rounded-2xl w-11/12 my-5 ml-5 overflow-y-auto h-screen">
        <table className="table-fixed w-11/12 h-fit m-5 text-left text-grey">
          <thead>
            <tr>
              <th>ID</th>
              <th>No. of patients</th>
              <th>Distance</th>
              <th>Assignee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-20 text-sm">
              <td>
                <a href="/RequestDetails">2135622</a>
              </td>
              <td>10</td>
              <td>20km</td>
              <td>John Doe (4567456)</td>
              <td>Dispatched</td>
            </tr>
            <tr className="h-20 text-sm">
              <td>
                <a href="/RequestDetails">2135622</a>
              </td>
              <td>1</td>
              <td>0.5km</td>
              <td>John Doe (4567456)</td>
              <td>On scene</td>
            </tr>
            <tr className="h-20 text-sm">
              <td>
                <a href="/RequestDetails">2135622</a>
              </td>
              <td>1</td>
              <td>0.5km</td>
              <td>John Doe (4567456)</td>
              <td>Dispatched</td>
            </tr>
            <tr className="h-20 text-sm">
              <td>
                <a href="/RequestDetails">2135622</a>
              </td>
              <td>1</td>
              <td>0.5km</td>
              <td>John Doe (4567456)</td>
              <td>Dispatched</td>
            </tr>
            <tr className="h-20 text-sm">
              <td>
                <a href="/RequestDetails">2135622</a>
              </td>
              <td>1</td>
              <td>0.5km</td>
              <td>John Doe (4567456)</td>
              <td>Dispatched</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
