import React from "react";
import cloud from '../icons/upcloud.svg'

function InputFiles({ id, label, multiple, accept ,setValue }) {

    const handleEvent = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragChange = e => {
        handleEvent(e);
        e.target.classList.toggle('dragover');
    }

    const handleDrop = e => {
        handleDragChange(e);
        let permit = true;
        console.log(e.dataTransfer.files);
        for (const file of e.dataTransfer.files) {
            if (file.type.slice(0,6) !== 'image/'){
                console.error('ERROR: Type not available');
                permit = false;
            }
        }
        permit && setValue(e.dataTransfer.files);
    }

    return (
        <>
            <label htmlFor={id}>
                <div
                    className='dropzone'
                    onDragEnter={handleDragChange}
                    onDragOver={handleEvent}
                    onDragLeave={handleDragChange}
                    onDrop={handleDrop}
                >
                    <img src={cloud} alt='upload icon' />
                    {label}
                </div>
                <input
                    id={id}
                    type='file'
                    multiple={multiple ? multiple : false}
                    accept={accept}
                    hidden
                    onChange={(e) => setValue(e.target.files)}
                />
            </label>
        </>
    )
}

export default InputFiles;