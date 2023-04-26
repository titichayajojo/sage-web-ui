import withAuth from "@/lib/helpers";
import SageNavBar from "../../components/SageNavBar";
import RequestDetailsBox from "@/components/RequestDetailsBox";
function RequestDetails() {
  return (
    <div>
      <SageNavBar />
      <RequestDetailsBox />
    </div>
  );
}
export default withAuth(RequestDetails)
