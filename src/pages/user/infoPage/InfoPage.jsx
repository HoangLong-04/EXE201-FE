import UserInfo from "../../../components/userInfo/UserInfo";
import Logo from "../../../assets/logo-exe.png";
import { useAuth } from "../../../hooks/useAuth";

function InfoPage() {
  const { user } = useAuth()
  
  
  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <UserInfo
        img={user.userProfile?.avatarUrl || "https://freesvg.org/img/abstract-user-flat-3.png"}
        fullName={user.userProfile?.fullName}
        id={user.userProfile?.id}
        phone={user.userProfile?.phone}
        bankAcc={user.userProfile?.bankAcc || '0988'}
        email={user.userProfile?.email}
        address={user.userProfile?.address}
        school={user.userProfile?.school}
      />
    </div>
  );
}

export default InfoPage;
