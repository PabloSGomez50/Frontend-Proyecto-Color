import React, { useEffect, useState } from "react";
import axios from '../api/axios';
import Dropdown from "../components_p/Dropdown";

import DeleteIcon from '../icons/delete.svg';
import SettingsIcon from '../icons/settings.svg';

function SkillsCard({ group, allSkills, userId, handleDelete, same }) {

    const PROF_URL = `/group_skills/${userId}`;

    const [ skills, setSkills ] = useState(group.skills);
    const [ filter, setFilter ] = useState([]);
    const [ editstate, setEditstate ] = useState(false);

    const modSkill = async (id, action) => {
        try {
            const response = await axios.put(
                PROF_URL, 
                {action, name: group.name, skills: id}
            );
            console.log(response.data);
            setSkills(response.data?.skills);
        } catch (err) {
            console.error(err);
        }
    }

    const deleteSkill = (id) => {
        if (editstate) {
            console.log(id);
            modSkill(id, 'remove');
        } else {
            console.log('No edit');
        }
    }

    useEffect(() => {
        if (allSkills) {
            const list = allSkills.filter(item => 
                skills.every(skill => skill.id !== item.id)
            );
            setFilter(list);
        }
        // eslint-disable-next-line
    }, [skills])

    return (
        <article className='skill-box'>
            <div className='skill-mod'>
                <h4>{group.name}</h4>
                {same &&
                <div>
                    {editstate &&
                    <img 
                        src={DeleteIcon} 
                        alt='Delete Skill Group' 
                        className='icon' 
                        onClick={() => handleDelete(group.id)}
                    />
                    }
                    <img 
                        src={SettingsIcon} 
                        alt='Edit Skill Group' 
                        className='icon' 
                        onClick={() => setEditstate(!editstate)}
                    />
                </div>}
            </div>
            <div className='skill-list'>
                {skills.lenght !== 0 && 
                    skills.map(skill => 
                    <div  
                        key={skill.id}
                        className='skill-item' 
                        onClick={() => deleteSkill(skill.id)}
                    >
                        <img src={skill.image} alt={skill.name} />
                        <span>
                            {skill.name}
                        </span>
                    </div>
                )}
                {same &&
                <Dropdown 
                    css='skill-item' 
                    mouseEnter={true} 
                    array={filter}
                    modData={modSkill}
                />
                }
            </div>
        </article>
    )
}

export default SkillsCard;