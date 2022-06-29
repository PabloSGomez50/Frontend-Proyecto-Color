import React, { useEffect, useState } from "react";
import axios from '../api/axios';
import Dropdown from "../components_p/Dropdown";

function SkillsCard({ group, allSkills, userId }) {

    // console.log(group);
    const [ skills, setSkills ] = useState(group.skills);
    const [ filter, setFilter ] = useState([]);

    const modSkill = async (id, action) => {
        try {
            const dataMod = {name: group.name, skills: [id]};
            const response = await axios.put(`/profile/${userId}`, {action, group: dataMod});
            console.log(response.data);
            setSkills(response.data?.skills);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const list = allSkills.filter(item => skills.every(skill => skill.id !== item.id))
        setFilter(list);
        // eslint-disable-next-line
    }, [skills])

    return (
        <article className='skill-box'>
            <h4>{group.name}</h4>
            <div className='skill-list'>
                {skills.lenght !== 0 && 
                    skills.map(skill => 
                    <div className='skill-item' key={skill.id}>
                        <img src={skill.image} alt={skill.name} />
                        <span>
                            {skill.name}
                        </span>
                    </div>
                )}
                <Dropdown 
                    css='skill-item' 
                    mouseEnter={true} 
                    array={filter}
                    modData={modSkill}
                />
            </div>
        </article>
    )
}

export default SkillsCard;