const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
    {
        id: 1,
        name: 'Juan',
        age: 22,
    }
];

exports.login = (req, res) => {
    const { name, age } = req.body;
    const user = users.find(u => u.name === name);

    if (!user) {
        return res.status(404).send('User not found');
    }

    if (user.age !== age) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY, {
        expiresIn: 3600 // 1 hora
    });

    res.status(200).send({ auth: true, token });
};

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send('No token provided');
    }

    jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }

        req.userId = decoded.id;
        next();
    });
};