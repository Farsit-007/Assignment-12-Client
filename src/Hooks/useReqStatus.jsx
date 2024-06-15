
import {useQuery} from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
const useReqStatus = () => {
    const {user,loading} = useAuth()
    const axiosSecure = useAxiosSecure()

    const{data : Reqstatus ,isLoading} = useQuery({
        queryKey : ['Reqstatus',user?.email],
        enabled :!loading && !!user?.email,
        queryFn : async ()=>{
          const{data} = await axiosSecure(`/create-donation-request/:id`)
          return data.status
        }
    })
    
    return [Reqstatus,isLoading];
};

export default useReqStatus;