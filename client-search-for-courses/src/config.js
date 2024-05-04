const isProd = process.env.NODE_ENV === 'production';

const config = {
    isProd,
    apiUrls: isProd ? 'https://exemple.com' : 'http://localhost:1337/api',


    apiUrl : 'https://api-gateway.psu.ac.th/Test/regist',
    
    apiKey: 'api_key=nmBZNKWKzGGT38rCETUbydQx4iC/daC2Xhw=',


    SSOOpenID: 'http://psusso-test.psu.ac.th/application/o/psuapi-contest-novabyte/.well-known/openid-configuration',

    // เพิ่ม URL ของ PSU Authorization Server ที่ใช้สำหรับการล็อกอิน
    authUrl: 'http://psusso-test.psu.ac.th/application/o/authorize/',

    // เพิ่ม URL ของ PSU Authorization Server ที่ใช้สำหรับการขอ Access Token
    accessTokenUrl: 'http://psusso-test.psu.ac.th/application/o/token/',

    // เพิ่ม Client ID และ Client Secret ที่ได้รับจาก PSU Authorization Server
    clientId: 'oDcrPWzBZByxlVChcJeFsM1ngoKEw6zmkESgMUe4',
    clientSecret: 'RxEj6aFb8uXru6zH7pFSJo8FpgIDtrbskSpwDsVcHEhoAbpwsAulTNlHo6Fuexnh3QRsto68cjLAMNJO37g3nTw6qDBq5vaxBX5vRKjEALU6zIKnPCQQsIDBLhbmEzd7',
};

export default config;