import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useProf from "../hooks/useProf";
import axios from '../api/axios';

import './Profile.css';
import SocialSideBar from "./SocialSideBar";
import ProjectList from "../com_projects/ProjectList";
import SkillsList from "./SkillsList";

function Profile() {
    const { userId } = useParams();
    const { prof, setProf } = useProf();
    const PROF_URL = `/profile/${userId}`;

    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        // const controller = new AbortController();

        const getUsers = async () => {
            try {
                // const response = await axiosPrivate.get(PROF_URL, {
                //     signal: controller.signal
                // });
                const response = await axios(PROF_URL);
                console.log(response.data);
                if (isMounted && response.data) {
                    const data = {
                        user: response.data?.user,
                        same: response.data?.same_user,
                        projects: response.data?.projects,
                        groups: response.data?.skills,
                        allSkills: response.data?.all_skills,
                        socials: response.data?.socials
                    }
                    setProf(data);
                }
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            // controller.abort();
        }
        // eslint-disable-next-line
    }, [userId])

    return (
        <div className="prof-content">
        {prof?.user ?
        <>
            <section className='prof-user'>
                <div className='prof-banner'>
                    <img src={prof.user.banner} alt='Banner'/>
                </div>
                <img className='prof-img' src={prof.user.image} alt={prof.user.name} />
                <div className='prof-text'>
                    <h3>{prof.user.name}</h3>
                    <p>{prof.user.career}</p>
                </div>
                <p className='prof-desc'>{prof.user.description}</p>
                <button className='cv'>Download CV</button>
            </section>

            <div className='prof-detail'>
                <SocialSideBar userId={userId} />

                <section className='prof-main'>

                    <SkillsList userId={userId} />

                    <ProjectList projects={prof.projects} />
                </section>
            </div>
        </>
        : <p>No user to display.</p>
        }
        </div>
    );
}

export default Profile;