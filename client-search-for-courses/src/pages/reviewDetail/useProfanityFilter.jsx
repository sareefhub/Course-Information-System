import { useState, useEffect } from 'react';

const useProfanityFilter = (filePath) => {
    const [profaneWords, setProfaneWords] = useState([]);

    useEffect(() => {
        const fetchProfanityWords = async () => {
            try {
                const response = await fetch(filePath);
                const data = await response.json();
                setProfaneWords(data.profanityWords);
            } catch (error) {
                console.error('Error fetching profanity words:', error);
            }
        };

        fetchProfanityWords();
    }, [filePath]);

    return profaneWords;
};

export default useProfanityFilter;
