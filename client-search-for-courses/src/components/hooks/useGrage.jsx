import { useEffect, useState } from 'react';
import axios from 'axios';
import Conf from '../../config';

export const useGrage = (code) => {
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        const accessTokenData = localStorage.getItem('accessToken');
        const accessToken = accessTokenData ? JSON.parse(accessTokenData) : null;

        if (accessToken && accessToken.accessToken) {
            const Token = accessToken.accessToken.token;
        
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${Conf.apiUrl}/level2/StudentGradeCampus/01/token?eduTerm=${encodeURIComponent('*')}&eduYear=${encodeURIComponent('*')}&offset=0&limit=1000`,
                headers: { 
                    'credential': `${Conf.apiKey}`, 
                    'token': Token 
                }
            };
        
            axios.request(config)
                .then((response) => {
                    const found = response.data.data.some(item => item.subjectCode === code);
                    setRegistered(found);
                    if (found) {
                        console.log("เคยลงทะเบียน");
                    } else {
                        console.log("ไม่เคยลงทะเบียน");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
        }
    }, [code]);

    return { registered };
};
