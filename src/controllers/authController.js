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

    const token = jwt.sign({ id: user.id }, '89648b10404191298519717fade96d09', {
        expiresIn: 3600 // 1 hora
    });

    res.status(200).send({ auth: true, token });
};

exports.verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, '89648b10404191298519717fade96d09', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        res.status(200).json({ message: 'Token is valid', userId: decoded.id });
    });
};
