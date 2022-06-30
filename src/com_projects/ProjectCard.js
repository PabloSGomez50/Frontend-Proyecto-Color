import React from "react";
import { useNavigate } from "react-router-dom";

import './ProjectCard.css';

const ProjectCard = ({ project, parent}) => {

    const navigate = useNavigate();

    return (
    <article className='card'>
        <section className='card-img'>
            <img src={project?.image} alt={project?.title} height='300' />
            <div>
            <progress max={100} value={project?.progress}>{project?.progress}</progress>

            <span>{project?.progress}%</span>
            </div>
        </section>
        <section className='card-data'>
            <div className='card-title'>
                {parent === 'list' ?
                    <h4 
                        className='hoverable' 
                        onClick={() => navigate(`/project/${project?.id}`)}
                    >
                        {project?.title}
                    </h4>
                    : <h4>{project?.title}</h4>
                }

                <p>{project?.pub_date}</p>
            </div>

            <p className='card-desc'>{project?.description}</p>

            <section className='card-mem'>
                {project?.members ?
                    project.members.map(user => 
                    <button 
                        key={user.id} 
                        className='user-thumbnail' 
                        onClick={() => navigate(`/profile/${user.id}`)}
                    >
                        <img src={user.image} alt={user.name} />
                        <span>{user.name}</span>
                    </button>)
                
                : <p>No members have been set.</p>
                }
            </section>
        </section>
    </article>
    );
};

export default ProjectCard;