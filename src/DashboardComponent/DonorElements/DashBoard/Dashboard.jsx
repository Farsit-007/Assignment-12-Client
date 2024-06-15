import useRole from "../../../Hooks/useRole";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import DonorDashboard from "../DonorDashboard/DonorDashboard";
import VulanteerDashboard from "../VulanteerDashboard/VulanteerDashboard";

const Dashboard = () => {
    const [role, isLoading] = useRole()
    return (
        <div>
            {role === 'donor' && <DonorDashboard></DonorDashboard>}
            {role === 'volunteer' && <VulanteerDashboard></VulanteerDashboard>}
            {role === 'admin' && <AdminDashboard></AdminDashboard>}
        </div>
    );
};

export default Dashboard;