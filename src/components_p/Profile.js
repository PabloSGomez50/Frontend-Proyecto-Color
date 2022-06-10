import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Profile() {
    const { userId } = useParams();
    const [ user, setUser ] = useState();
    const [ projects, setProjects ] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(`/profile/${userId}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUser(response.data?.user);
                isMounted && setProjects(response.data?.projects);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [userId])

    return (
        <article>
            <h2>Project List</h2>

            {user
            ? (<>{Object.keys(user).map((atribute) => <h4 key={atribute}>{user[atribute]}</h4>)}</>)
            : <p>No user to display.</p>}

            {projects?.length
            ? (<ul>
                {projects.map((project, i) => <li key={i}>{project?.title}</li>)}
            </ul>)
            : <p>No projects to display.</p>
            }
        </article>
    );
}

export default Profile;