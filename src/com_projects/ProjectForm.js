import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

const PROJ_URL = '/project/3';

function ProjectForm() {

    const { auth } = useAuth();
    const navigate = useNavigate();

    const [ project, setProject ] = useState({});
    const [ title, setTitle ] = useState('');
    const [ prog, setProg ] = useState(0);
    const [ description, setDesc ] = useState('');
    const [ users, setUsers ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ cats, setCats ] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = new FormData();

        payload.set('data', JSON.stringify({ title, description, progress: prog, members, categories }));
        payload.set('auth', auth.accessToken);

        try {
            const response = await axiosPrivate.post(
                PROJ_URL,
                payload
            );
            const data = await response.data;
            console.log(data);
            navigate(PROJ_URL);
        } catch (err) {
            console.error(err);
        }
    }

    const selectMember = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const selected = e.target.selectedOptions;
        const arr = [];
        for (const option of selected){
            console.log(option.value);
            arr.push(parseInt(option.value));
        }
        console.log(arr);
        setMembers(arr);
    }

    const selectCategories = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const selected = e.target.selectedOptions;
        const arr = [];
        
        for (const option of selected){
            console.log(option.value);
            arr.push(parseInt(option.value));
        }
        console.log(arr);
        setCategories(arr);
    }

    useEffect(() => {
        let isMounted = true;
        const getProject = async () => {
            try {
                const response = await axiosPrivate.get(
                    PROJ_URL
                );
                const data = await response.data;
                if (isMounted) {
                    console.log(data);
                    setUsers(data.users);
                    setProject(data.project);
                    setTitle(data.project.title);
                    setCats(data.categories);
                    setDesc(data.project.description);
                    setProg(data.project.progress);
                    setMembers(data.project.members.map(cat => cat.id));
                    setCategories(data.project.categories.map(cat => cat.id));
                }
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
        <form onSubmit={handleSubmit}>
            <img src={project.image} alt={project.title} height='300' width='300'/>
            <label htmlFor='title'>Title:</label>
            <input 
                id='title'
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <label htmlFor='progress'>Progress:</label>
            <input 
                id='progress'
                type='number'
                min={0}
                max={100}
                value={prog}
                onChange={e => setProg(e.target.value)}
            />

            <label htmlFor='description'>Description: </label>

            <textarea
                id='description'
                maxLength={256}
                value={description}
                onChange={(e) => setDesc(e.target.value)}
            />

            <label htmlFor='members'>Members:</label>
            <select id='members' multiple required onChange={selectMember} value={members}>
                {users.length ?
                    users.map(user => 
                        <option 
                        key={user.id} 
                        value={user.id}
                        // selected={members.some(member => member.id === user.id)}
                        >{user.name}</option>
                    )
                :   <option>No members registered</option>
                }
            </select>

            <label htmlFor='categories'>Categories:</label>
            <select id='categories' multiple onChange={selectCategories} value={categories}>
                {cats.length ?
                    cats.map(category => 
                    <option key={category.id} value={category.id} >{category.name}</option>)
                :   <option>No categories created!</option>
                }
            </select>

            {/* <label htmlFor='color'>Color:</label>
            <input
                id='color'
                type='color'
            /> */}

            <button>Submit Project</button>
        </form>
    )
}

export default ProjectForm;