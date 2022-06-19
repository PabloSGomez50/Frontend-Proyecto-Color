import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

const USER_EDIT = '/edit_user';
const MAIL_REGEX = /.+/ ///^(?=[a-z]*)(?=\d*).{4,10}@.+\..{2,4}$/;

function UserForm() {

    const { auth } = useAuth();

    const [ username, setName ] = useState('');
    const [ career, setCareer ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ description, setDesc ] = useState('');

    const [ files, setFiles ] = useState([]);
    const [ imgs, setImgs ] = useState([]);
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.classList.contains("dropzone")) {
            e.target.classList.remove("dragover");
        }
        console.log(e.dataTransfer.files);
        setFiles(e.dataTransfer.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputs = JSON.stringify({username, career, email, description, 
            // 'numero': 40
        });
        let payload = new FormData();

        payload.set('profile_img', files[0]);
        for (let i = 1; i < files.length; i++) {
            payload.set(i, files[i]);
        }
        payload.set('auth', auth.accessToken);
        payload.set('data', inputs);
        const response = await axiosPrivate.post(
            USER_EDIT,
            payload
        );
        const data = await response.data;
        console.log(data);
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
                // pattern={MAIL_REGEX}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='description'>Description: </label>

            <textarea
                id='description'
                maxLength={256}
                value={description}
                onChange={(e) => setDesc(e.target.value)}
            />

            <label htmlFor='imgProf'>
                <div 
                    className='dropzone' 
                    onDrop={handleDrop}
                    onDragEnter={e => {
                        e.stopPropagation(); 
                        e.preventDefault();
                        if (e.target.classList.contains("dropzone")) {
                            e.target.classList.add("dragover");
                        }
                    }}
                    onDragOver={e => {
                        e.stopPropagation(); 
                        e.preventDefault();
                    }}
                    onDragLeave={e => {
                        e.stopPropagation(); 
                        e.preventDefault();
                        if (e.target.classList.contains("dropzone")) {
                            e.target.classList.remove("dragover");
                        }
                    }}
                >Profile image</div>
            </label>
            <input
                onChange={(e) => {console.log(e.target.files); setFiles(e.target.files);}} 
                type='file'
                id='imgProf'
                name='imgProf'
                // multiple
                accept='image/*'
                hidden
            />

            <button>Update User</button>
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