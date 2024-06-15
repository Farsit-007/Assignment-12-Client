
import {useQuery} from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
const useStatus = () => {
    const {user,loading} = useAuth()
    const axiosSecure = useAxiosSecure()

    const{data : status ,isLoading} = useQuery({
        queryKey : ['status',user?.email],
        enabled :!loading && !!user?.email,
        queryFn : async ()=>{
          const{data} = await axiosSecure(`/user/${user?.email}`)
          return data.status
        }
    })
    
    return [status,isLoading];
};

export default useStatus;