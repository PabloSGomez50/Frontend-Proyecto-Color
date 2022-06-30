import { useContext } from 'react';
import ProfileContext from '../com_users/ProfileProvider';


const useProf = () => {
    return useContext(ProfileContext);
}

export default useProf;