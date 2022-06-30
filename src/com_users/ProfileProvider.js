import React, { createContext, useState } from "react";

const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
    const [ prof, setProf ] = useState({projects: [], groups: [], allSkills: [], socials: []});

    return (
        <ProfileContext.Provider value={{ prof, setProf }}>
            { children }
        </ProfileContext.Provider>
    );
}

export default ProfileContext;