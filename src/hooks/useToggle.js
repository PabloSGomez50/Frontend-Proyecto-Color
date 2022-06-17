import useLocalstorage from "./useLocalStorage";

function useToggle(key, initValue) {
    const [value, setValue] = useLocalstorage(key, initValue);

    const toggle = (prop) => {
        setValue(prev => {
            return typeof prop === 'boolean' ? prop : !prev;
        })
    }

    return [value, toggle];
}

export default useToggle;