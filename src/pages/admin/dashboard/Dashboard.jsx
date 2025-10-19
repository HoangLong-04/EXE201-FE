import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from '@mui/icons-material/Paid';
import DashboardCard from "../../../components/dashboardCard/DashboardCard";
import { useEffect, useState } from "react";
import PrivateApi from "../../../services/PrivateApi";

function Dashboard() {
  const [userCount, setUserCount] = useState(0)
  const [revenue, setRevenue] = useState(0)

  const fetchUserCount = async () => {
    try {
      const response = await PrivateApi.getUserCount()
      setUserCount(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchRevenue = async () => {
    try {
      const response = await PrivateApi.getRevenue()
      setRevenue(response.data.totalAmount)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    fetchUserCount(),
    fetchRevenue()
  }, [])
  return (
    <div>
      <div className="flex justify-around">
        <DashboardCard Icon={<PersonIcon sx={{fontSize: '50px'}} />} title={"Người dùng"} data={userCount} />
        <DashboardCard Icon={<PaidIcon sx={{fontSize: '50px'}} />} title={"Doanh thu"} data={(revenue.toLocaleString()+' VND')} />
        {/* <DashboardCard Icon={<PersonIcon sx={{fontSize: '50px'}} />} title={"User"} data={111} /> */}
      </div>
      
    </div>
  );
}

export default Dashboard;
