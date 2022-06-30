import React, { useState } from "react";

import './SocialSideBar.css';
import AddIcon from '../icons/add.svg';
import useProf from "../hooks/useProf";
import axios from "../api/axios";


function SocialSideBar({ userId }) {
    const PROF_URL = `/profile/${userId}`;
    const { prof, setProf } = useProf();
    const [ editstate, setEditstate ] = useState(false);

    const [ name, setName ] = useState('');
    const [ url, setUrl ] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        e.stopPropagation();
        const social = {name, url};
        console.log('submit:', social);
        try {
            const response = await axios.put(PROF_URL, {social});
            console.log(response.data);
            setProf({...prof, socials: response.data?.socials});
            setName('');
            setUrl('');
            setEditstate(false);
        } catch (err) {
            console.error(err.response.data);
        }
    }

    return (
        <aside>
            <h4>Social media and data</h4>

            {prof.same && <img src={AddIcon} alt='add new social' onClick={() => setEditstate(!editstate)} />}
            
            {editstate &&
                <form onSubmit={handleSubmit}>
                    <label htmlFor='social-name'>Red social:</label>
                    <input 
                        id='social-name' 
                        type='text'value={name} 
                        onChange={e => setName(e.target.value)}
                        autoComplete='false'
                        required
                    />

                    <label htmlFor='social-url'>Url:</label>
                    <input 
                        type='url' 
                        id='social-url' 
                        value={url} 
                        onChange={e => setUrl(e.target.value)}
                        required
                    />

                    <button>Crear</button>
                </form>
            }
            {prof.socials.length ?
                prof.socials.map(social =>
                    <div key={social.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img className='icon' src={social.image} alt={social.name} />
                        <a href={social.url}>{social.name}</a>
                    </div>    
                )
            :   <p>No Social has been set.</p>
            }
        </aside>
    )
}

export default SocialSideBar;