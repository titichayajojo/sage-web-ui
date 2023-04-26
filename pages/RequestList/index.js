import SageNavBar from "../../components/SageNavBar";
import RequestListBox from "@/components/RequestListBox";
import withAuth from "@/lib/helpers";
function RequestList() {
  return (
    <div>
      <SageNavBar />
      <RequestListBox />
    </div>
  );
}
export default withAuth(RequestList)