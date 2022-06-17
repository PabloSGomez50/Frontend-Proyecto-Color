import { useState, useEffect } from "react";

function getLocalValue(key, initValue) {
    if (typeof window == 'undefined') return initValue;

    // if a value is already store
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    if (initValue instanceof Function) return initValue();

    return initValue;
}

function useLocalstorage(key, initValue) {
    const [value, setValue] = useState(() => getLocalValue(key, initValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalstorage;