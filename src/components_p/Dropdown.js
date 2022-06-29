import React, { useState } from "react";

import PlusIcon from '../icons/add.svg';
import './Dropdown.css';

const Dropdown = ({ css, mouseEnter, array, modData }) => {
    const [dropstate, setDropstate] = useState(false);

    const handleMouseEnter = () => {
        mouseEnter && setDropstate(true);
    }

    const handleClick = () => {
        mouseEnter ? setDropstate(true) : setDropstate(!dropstate);

    }

    const submitValue = (id) => {
        modData(id, 'add');
        setDropstate(false);
    }

    return (
        <>
            {array.length !==0 &&
                <div
                    className="dropdown"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => setDropstate(false)}>
                    <button
                        className={css}
                        onClick={handleClick}
                    >
                        <img src={PlusIcon} alt='Plus icon' />
                    </button>

                    <div className={dropstate ? "dropdown-content" : "hidden"}>
                        {array.map(value => 
                        <p key={value.id} onClick={() => submitValue(value.id)}>
                            {value.name}
                        </p>)}
                    </div>
                </div>
            }
        </>
    )
}

export default Dropdown;