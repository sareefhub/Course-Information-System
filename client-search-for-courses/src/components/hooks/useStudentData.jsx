import { useState, useEffect } from 'react';
import axios from 'axios';
import Conf from '../../config';

export const useStudentData = () => { 
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessTokenData = localStorage.getItem('accessToken');
                if (!accessTokenData) {
                    console.error('Access token not found.');
                    return;
                }
                const accessToken = JSON.parse(accessTokenData);
                const Token = accessToken.accessToken.token;
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `${Conf.apiUrl}/level2/StudentDetail/token`,
                    headers: {
                        'credential': `${Conf.apiKey}`,
                        'token': Token
                    }
                };

                const response = await axios.request(config);
                setStudentData(response.data.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return { studentData };
};