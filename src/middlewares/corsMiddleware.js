const cors = require('cors');

const corsOptions = {
    origin: 'https://prueba-cors.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentias: true,
    optionSuccessStatus: 200
};

module.exports = cors(corsOptions);