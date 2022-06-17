import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

const USER_EDIT = '/edit_user';

function UserForm() {

    const { auth } = useAuth();
    const [ files, setFiles ] = useState([]);
    const [ imgs, setImgs ] = useState([]);

    const handleFiles = (e) => {
        console.log(e.target.files);
        setFiles(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = new FormData();
        payload.set('auth', auth.accessToken);
        payload.set('files', files);
        console.log(e.target.elements.fileElem.files);
        const response = await axiosPrivate.post(
            USER_EDIT,
            payload
            // JSON.stringify({'auth': auth.accessToken})
        );
        const data = await response.data;
        console.log(data);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = e.dataTransfer;
        const _files = data.files;
        console.log(_files);
        if (e.target.classList.contains("dropzone")) {
            e.target.classList.remove("dragover");
        }
        setFiles(_files);
    }

    useEffect(() => {
        let isMounted = true;
        const arr = [];
        for (const file of files) {
            const url = URL.createObjectURL(file);
            console.log(url);
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
            
            <label htmlFor='fileElem'>
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
                >Files</div>
            </label>
            <input
                onChange={handleFiles} 
                type='file'
                id='fileElem'
                name='fileElem'
                multiple 
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