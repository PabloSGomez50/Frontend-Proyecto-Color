import React, { useState } from "react";
import axios from '../api/axios';

import './Skills.css';

import SkillsCard from "./SkillsCard";
import AddIcon from '../icons/add.svg';
import useProf from "../hooks/useProf";

function SkillsList({ userId }) {
    const PROF_URL = `/group_skills/${userId}`;
    const { prof, setProf } = useProf();

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
            const response = await axios.post(
                PROF_URL,
                {name: groupName, skills: selected}
            );
            if (response.data?.group) {
                setProf({...prof, groups: prof.groups.concat(response.data.group)});
                setSelected([]);
                setgroupName('');
                setDropstate(false);
            }
            console.log(response.data);
            console.log(selected);
        } catch (err) {
            console.error(err.response.data);
        }
    }
    
    const handleDelete = async (id) => {
        console.log('delete');
        const SKILL_URL = `${PROF_URL}/${id}`;
        try {
            const response = await axios.delete(SKILL_URL);
            setProf({...prof, groups: response.data?.skills});
            console.log(response.data?.skills);
        } catch (err) {
            console.error(err.response.data);
        }
    }

    return (
        <div className='skill-container'>
            
            {prof.groups.length !== 0 && 
            prof.groups.map(group => 
                <SkillsCard 
                    key={group.id} 
                    group={group} 
                    allSkills={prof.allSkills} 
                    userId={userId}
                    handleDelete={handleDelete}
                    same={prof.same}
                />
            )}

            {prof.groups?.length < 3 && prof.same &&
            <div className='skill-box add' onClick={() => setDropstate(true)}>
                {dropstate ?
                <>
                    <div className='new-group'>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button onClick={handleClose}>X</button>
                            <button onClick={addGroup}>+</button>
                        </div>
                        <input 
                            type='text'
                            value={groupName}
                            onChange={e => setgroupName(e.target.value)}
                        />

                        {prof.allSkills.length ?
                            prof.allSkills.map(skill => 
                            <div key={skill.id}>
                                <input 
                                    type='checkbox' 
                                    id={`input-${skill.id}`}
                                    checked={selected.includes(skill.id)}
                                    onChange={() => addSkill(skill.id)}
                                />
                                <label htmlFor={`input-${skill.id}`}>{skill.name}</label>
                            </div>
                            )
                        :   <p>No skills available.</p>
                        }
                    </div>
                </>
                :   
                <img className='icon' src={AddIcon} alt='Add new SkillGroup'/>
                }
            </div>
            }
        </div>
    )
}

export default SkillsList;