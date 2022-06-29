import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ProjectCard from "../com_projects/ProjectCard";

import './Users.css';
import SkillsList from "./SkillsList";

function Profile() {
    const { userId } = useParams();
    const [ user, setUser ] = useState();
    const [ projects, setProjects ] = useState();
    const [ skillg, setSkillG ] = useState();
    const [ allSkills, setAllSkills ] = useState([]);
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
                if (isMounted) {
                    setUser(response.data?.user);
                    setProjects(response.data?.projects);
                    setSkillG(response.data?.skills);
                    setAllSkills(response.data?.all_skills);
                }
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
        // eslint-disable-next-line
    }, [userId])

    return (
        <div className="prof-content">
        {user ?
        <>
            <section className='prof-user'>
                <div className='prof-banner'>
                    <img src={user.banner} alt='Banner'/>
                </div>
                <img className='prof-img' src={user.image} alt={user.name} />
                <div className='prof-text'>
                    <h3>{user.name}</h3>
                    <p>{user.career}</p>
                </div>
                <p className='prof-desc'>{user.description}</p>
                <button className='cv'>Download CV</button>
            </section>

            <div className='prof-detail'>
                <aside>
                    Social media and data
                </aside>

                <section className='prof-main'>

                    <SkillsList group_list={skillg} allSkills={allSkills} userId={userId} />

                    {/* <ProjectList projects={projects} /> */}
                    {projects?.length ?
                        projects.map((project) =>
                            <ProjectCard key={project.id} project={project} parent='list' />
                        )
                        : <p>No projects to display.</p>
                    }
                </section>
            </div>
        </>
        : <p>No user to display.</p>
        }
        </div>
    );
}

export default Profile;