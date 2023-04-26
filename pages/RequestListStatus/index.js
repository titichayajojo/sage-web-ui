import SageNavBar from "../../components/SageNavBar";
import RequestListStatusBox from "@/components/RequestListStatusBox";
import withAuth from "@/lib/helpers";
function RequestListStatus() {
  return (
    <div>
      <SageNavBar />
      <RequestListStatusBox />
    </div>
  );
}
export default withAuth(RequestListStatus)
