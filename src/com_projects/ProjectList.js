import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projects }) {
    return (
        <>
        {projects?.length ?
            projects.map(project => 
                <ProjectCard key={project.id} project={project} parent='list' />
            )
        :   <p>No projects available.</p>
        }
        </>
        
    );
}

export default ProjectList;