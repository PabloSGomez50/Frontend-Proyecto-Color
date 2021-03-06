import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import axios from "../api/axios";

import Dropdown from "../components_p/Dropdown";
import './Project.css';

function ProjectPage() {
    const { projectId } = useParams();

    const [ project, setProject ] = useState({});
    const [ categories, setCat ] = useState([]);
    const [ unselected, setUnselected ] = useState([]);

    const modCat = async (id, action) => {
        try {
            const response = await axios.put(`/project/${projectId}`,{ action , cat: id});
            console.log(response.data);
            setProject({...project, categories: response.data.categories});
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const list_cat = categories.filter(category => !project.categories.some(cat => cat.id === category.id))
        console.log(list_cat);
        setUnselected(list_cat);
    }, [project, categories])

    useEffect(() => {
        let isMounted = true;
        
        const getProject = async () => {
            try {
                const response = await axios(`/project/${projectId}`);
                console.log(response?.data);
                isMounted && setProject(response.data?.project);
                isMounted && setCat(response.data?.categories);
            } catch (err) {
                console.error(err);
            }
        }

        getProject();

        return () => {
            isMounted = false;
            console.log('unmounted');
        }
    }, [projectId])

    return (
        <>
            <h2>The project with id {projectId}</h2>
            
            {project.categories ?
                project.categories.map(cat => 
                <button 
                    key={cat.id}
                    className='cat-thumbnail'
                    onClick={() => modCat(cat.id, 'remove')}
                >
                    <div id='delete-icon'></div>
                    {cat.name}
                </button>)
            : <span>Empty categories.</span>
            }
            {unselected.length !== 0 &&     
            <Dropdown 
                css='cat-thumbnail' 
                mouseEnter={true}
                array={unselected}
                modData={modCat}
            />}
            
            <ProjectCard project={project} />
        </>
    )
}

export default ProjectPage;