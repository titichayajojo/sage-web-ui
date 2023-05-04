import RequestStatusDetailBox from "@/components/RequestStatusDetailBox";
import withAuth from "@/lib/helpers";
import { useRouter } from "next/router";
import Auth from "@/lib/api/auth";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/cookie";
function RequestDetails() {
  const router = useRouter();
  const emergencyId = router.query.id;
  const jobId = router.query.jobId;
  const [caseInfo, setCaseInfo] = useState(null);
  const [medInfo, setMedInfo] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);
  const [location, setLocation] = useState(null);
  const [paraName, setParaName] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    try {
      const getUserRole = async () => {
        const token = getCookie("token");
        console.log(token);
        const user = await Auth.getUserProfile({
          token: token,
        });
        setHospitalId(user.data.data.user.hospitalId);
      };
      const getCaseDetails = async () => {
        const token = getCookie("token");
        const res = await Auth.getCaseAndMedInfo({
          token: token,
          params: { id: emergencyId },
        });
        console.log("data: ", res.data.data);
        setCaseInfo(res.data.data.emergencyCase);
        setMedInfo(res.data.data.userProfile);
        setLocation(res.data.data.formattedEmergencyCase);
        setParaName(
          res.data.data.formattedEmergencyCase.receiverProfile
            .medicalInformation.name
        );
        setStatus(res.data.data.formattedEmergencyCase.job.status);
      };
      getUserRole();
      getCaseDetails();
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log("emergency Id", emergencyId);

  return caseInfo && medInfo && hospitalId && location && paraName && status ? (
    <RequestStatusDetailBox
      caseInfo={caseInfo}
      medInfo={medInfo}
      hospitalId={hospitalId}
      jobId={jobId}
      location={location}
      paraName={paraName}
      status={status}
    />
  ) : (
    <div></div>
  );
}
export default withAuth(RequestDetails);
