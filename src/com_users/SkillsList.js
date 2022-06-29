import React, { useState } from "react";
import axios from '../api/axios';

import SkillsCard from "./SkillsCard";
import AddIcon from '../icons/add.svg';
import './Skills.css';
import useAuth from "../hooks/useAuth";

function SkillsList({ group_list, allSkills, userId}) {

    const { auth } = useAuth();
    const same = auth.user.id === parseInt(userId);

    const [ groups, setGroups ] = useState(group_list);
    const [ dropstate, setDropstate ] = useState(false);
    const [ selected, setSelected ] = useState([]);
    const [ groupName, setgroupName] = useState('');

    const handleClose = e => {
        e.preventDefault();
        e.stopPropagation();
        setDropstate(false);
    }

    const addSkill = (id) => {
        if(!selected.includes(id)){
            setSelected(selected.concat(id));
        } else {
            setSelected(selected.filter(item => item !== id));
        }
        console.log(id);
    }

    const addGroup = async () => {
        try {
            const response = await axios.put(
                `/profile/${userId}`,
                {action: 'create', group: {name: groupName, skills: selected}}
            );
            response.data?.group && setGroups(groups.concat(response.data.group))
            console.log(response.data);
            console.log('Open the checkbox list');
            console.log(selected);
        } catch (err) {
            // console.error(err);
            console.error(err.response.data)
        }
    }

    return (
        <div className='skill-container'>
            {groups.length !== 0 && 
            groups.map(group => 
                <SkillsCard key={group.id} group={group} allSkills={allSkills} userId={userId} />
            )}
            {groups.length < 3 && same &&
            <div className='skill-box' onClick={() => setDropstate(true)}>
                {dropstate ?
                <>
                    <div className='new-group'>
                        <button onClick={handleClose}>X</button>
                        <button onClick={addGroup}>+</button>
                        <input 
                            type='text'
                            value={groupName}
                            onChange={e => setgroupName(e.target.value)}
                        />

                        {allSkills.length ?
                            allSkills.map(skill => 
                            <div key={skill.id}>
                                <input 
                                    type='checkbox' 
                                    id={`input-${skill.id}`} 
                                    onInput={() => addSkill(skill.id)}
                                />
                                <label htmlFor={`input-${skill.id}`}>{skill.name}</label>
                            </div>
                            )
                        :   <p>No skills available.</p>
                        }
                    </div>
                </>
                :   
                <img src={AddIcon} alt='Add new SkillGroup'/>
                }
            </div>
            }
        </div>
    )
}

export default SkillsList;