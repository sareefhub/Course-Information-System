const isProd = process.env.NODE_ENV === 'production';

const config = {
    isProd,
    apiUrl: isProd ? 'https://exemple.com' : 'https://api-gateway.psu.ac.th/Test/regist',
    apiKey: 'api_key=nmBZNKWKzGGT38rCETUbydQx4iC/daC2Xhw='
};

export default config;