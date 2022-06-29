import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProjectCard from '../com_projects/ProjectCard';

import './Components.css';

const PROJECT_URL = '/project_list';

function Home() {

    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        let isMounted = true;
        
        const getProjects = async () => {
            try {
                const response = await axios(PROJECT_URL);
                console.log(response?.data);
                isMounted && setProjects(response.data?.projects);
            } catch (err) {
                console.error(err);
            }
        }

        getProjects();

        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <div>
            {/* <h3>This is the Home Page</h3> */}

            {projects.length ?
                projects.map(project => 
                    <ProjectCard key={project.id} project={project} parent='list' />
                )
            :   <p>No projects available.</p>
            }
        </div>
    );
}

export default Home;