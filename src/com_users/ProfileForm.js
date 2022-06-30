import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';
import InputFiles from '../components_p/InputFiles';
import { useNavigate } from 'react-router-dom';

const USER_EDIT = '/edit_user';
const MAIL_REGEX = /^(?=[a-z]*)(?=\d*).{4,10}@.+\..{2,4}$/;

function UserForm() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const user = auth.user;

    const [ username, setName ] = useState(user.name);
    const [ career, setCareer ] = useState(user.career);
    const [ email, setEmail ] = useState('');
    const [ description, setDesc ] = useState(user.description);

    const [ files, setFiles ] = useState([]);
    const [ imgs, setImgs ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const inputs = JSON.stringify({
            username, career, email, description,
        });
        let payload = new FormData();

        payload.set('profile_img', files[0]);
        for (let i = 1; i < files.length; i++) {
            payload.set(i, files[i]);
        }
        payload.set('auth', auth.accessToken);
        payload.set('data', inputs);
        try {
            const response = await axiosPrivate.post(
                USER_EDIT,
                payload
            );
            const data = await response.data;
            console.log(data);
            navigate(`/profile/${user.id}`);
        } catch (err) {
            console.error(err);
        }
        
    }

    useEffect(() => {
        let isMounted = true;
        const arr = [];
        for (const file of files) {
            const url = URL.createObjectURL(file);
            arr.push({url, name: file.name});
        }
        console.log(arr);
        isMounted && setImgs(arr);
        return () => {
            isMounted = false;
        }
    }, [files]);

    return (
        <form onSubmit={handleSubmit}>
            
            <label htmlFor='username'>Username:</label>
            <input 
                id='username'
                type='text'
                // pattern=''
                value={username}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor='career'>Career:</label>
            <input 
                id='career'
                type='text'
                value={career}
                onChange={(e) => setCareer(e.target.value)}
            />
            
            <label htmlFor='email'>Email:</label>
            <input 
                id='email'
                type='email'
                pattern={MAIL_REGEX}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='description'>Description: </label>

            <textarea
                id='description'
                maxLength={512}
                value={description}
                onChange={(e) => setDesc(e.target.value)}
            />

            <InputFiles 
                id='imgProf' 
                label='Profile image' 
                multiple={true} 
                accept='image/*'
                setValue={setFiles} 
            />

            <button>Update User</button>
            {/* <input type='color' /> */}
            <div>
                {imgs ? 
                    imgs.map((data, i) => <img 
                        src={data.url} 
                        key={i} 
                        alt={data.name}
                        height='240'
                        onLoad={() => {URL.revokeObjectURL(data.url)}}
                    />)
                 : <p>No imgs Selected</p>}
            </div>
        </form>
    )
}

export default UserForm;