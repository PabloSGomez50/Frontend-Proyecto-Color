import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import axios from "../api/axios";

function ProjectPage() {
    const { projectId } = useParams();
    const [ project, setProject ] = useState({});

    useEffect(() => {
        let isMounted = true;
        
        const getProject = async () => {
            try {
                const response = await axios(`/project/${projectId}`);
                console.log(response?.data);
                isMounted && setProject(response.data?.project);
            } catch (err) {
                console.error(err);
            }
        }

        getProject();

        return () => {
            isMounted = false;
        }
    }, [])
    return (
        <>
            <h2>The project with id {projectId}</h2>
            <ProjectCard project={project} />
        </>
    )
}

export default ProjectPage;