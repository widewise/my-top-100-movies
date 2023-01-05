import React, { useCallback, useState } from 'react';

export const useToggle = (initialValue = false): [boolean, React.Dispatch<void>] => {
    const [flag, setFlag] = useState(initialValue);

    const toggle = useCallback(() => {
        setFlag(!flag);
    }, [flag]);

    return [flag, toggle];
};