import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

import ProjectList from '../com_projects/ProjectList';

import './Home.css';


function Home() {

    const PROJECT_URL = '/project_list';
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        let isMounted = true;
        
        const getProjects = async () => {
            try {
                const response = await axios(PROJECT_URL);
                console.log(response?.data);
                isMounted && setProjects(response.data?.projects);
            } catch (err) {
                console.error(err.response.data);
            }
        }

        getProjects();

        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <div className='project-list'>
            <ProjectList projects={projects} />
        </div>
    );
}

export default Home;