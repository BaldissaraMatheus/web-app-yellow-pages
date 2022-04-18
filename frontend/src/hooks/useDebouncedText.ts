import { useState, useEffect } from 'react';

export function useDebouncedText(text: string, ms: number) {
    const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedText(text), ms);
        return () => clearTimeout(timeout);
    }, [text, ms]);

    return debouncedText;
}
