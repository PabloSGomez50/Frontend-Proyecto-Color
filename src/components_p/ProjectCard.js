import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
    const data = props.project;
    const pattern = props.pattern;
    if (data) {
        // console.log("works");
        console.log(data);
    }
    return (
        <article style={{display: 'flex', justifyContent: 'space-around', margin: '2rem', backgroundColor: '#EBEF99'}}>
            <img src={data?.image} alt={data?.title} height='300' />
            <div>
                {pattern === 'list' ?
                    <Link to={`/project/${data.id}`} >{data?.title}</Link>
                    : <h4>{data?.title}</h4>
                }
                <p>{data?.pub_date}</p>
                <p>{data?.description}</p>
            </div>
        </article>
    );
};

export default ProjectCard;