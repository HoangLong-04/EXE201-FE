import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from '@mui/icons-material/Paid';
import DashboardCard from "../../../components/dashboardCard/DashboardCard";

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between">
        <DashboardCard Icon={<PersonIcon sx={{fontSize: '50px'}} />} title={"User"} data={111} />
        <DashboardCard Icon={<PaidIcon sx={{fontSize: '50px'}} />} title={"Revenue"} data={111} />
        <DashboardCard Icon={<PersonIcon sx={{fontSize: '50px'}} />} title={"User"} data={111} />
      </div>
      
    </div>
  );
}

export default Dashboard;
