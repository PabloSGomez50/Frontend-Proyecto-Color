import React from "react";
import { useNavigate } from "react-router-dom";

import './Project.css';

const ProjectCard = ({ project, parent}) => {

    const navigate = useNavigate();

    return (
        <article className='card'>
            <img src={project?.image} alt={project?.title} height='300' />
            <div>
                {parent === 'list' ?
                    <h4 className='project-title' onClick={() => navigate(`/project/${project?.id}`)}>{project?.title}</h4>
                    : <h4>{project?.title}</h4>
                }
                <p>{project?.pub_date}</p>
                <progress max={100} value={project?.progress}>{project?.progress}</progress>
                <span>{project?.progress}%</span>
                <p>{project?.description}</p>
                {project?.members ?
                    project.members.map(user => 
                    <button 
                        key={user.id} 
                        className='user-thumbnail' 
                        onClick={() => navigate(`/profile/${user.id}`)}
                    >
                        <img src={user.image} alt={user.name} height='64' width='64' />
                        {user.name}
                    </button>)
                : <p>No members have been set.</p>
                }
            </div>
        </article>
    );
};

export default ProjectCard;