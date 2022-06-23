import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

const PROJ_EDIT = '/project/3';

function ProjectForm() {

    const { auth } = useAuth();

    const [ title, setTitle ] = useState('');
    const [ prog, setProg ] = useState(0);
    const [ description, setDesc ] = useState('');
    const [ userMembers, setUserMembers ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ cats, setCats ] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = new FormData();

        payload.set('data', JSON.stringify({ title, description, progress: prog, members, categories }));
        payload.set('auth', auth.accessToken);

        const response = await axiosPrivate.post(
            PROJ_EDIT,
            payload
        );
        const data = await response.data;
        console.log(data);
    }

    const selectMember = (e) => {
        e.preventDefault();
        const selected = e.target.selectedOptions;
        const arr = [];
        // console.log(selected);
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
                    PROJ_EDIT
                );
                const data = await response.data;
                isMounted && console.log(data);
                isMounted && setUserMembers(data.users);
                isMounted && setTitle(data.project.title);
                isMounted && setCats(data.categories);
                isMounted && setDesc(data.project.description);
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
            <select id='members' multiple required onChange={selectMember}>
                {userMembers.length ?
                    userMembers.map(user => 
                        <option 
                        key={user.id} 
                        value={user.id}
                        >{user.name}</option>
                    )
                :   <option>No members registered</option>
                }
            </select>

            <label htmlFor='categories'>Categories:</label>
            <select id='categories' multiple onChange={selectCategories}>
                {cats.length ?
                    cats.map(category => 
                    <option key={category.id} value={category.id}>{category.name}</option>)
                :   <option>No categories created!</option>
                }
            </select>

            <label htmlFor='color'>Color:</label>
            <input
                id='color'
                type='color'
            />

            <button>Submit Project</button>
        </form>
    )
}

export default ProjectForm;