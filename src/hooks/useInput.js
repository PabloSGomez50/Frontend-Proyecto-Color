import useLocalstorage from "./useLocalStorage";

function useInput(key, initValue) {
    const [value, setValue] = useLocalstorage(key, initValue);

    const reset = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [ value, reset, attributeObj ];
}

export default useInput;