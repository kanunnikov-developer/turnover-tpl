const { prisma } = require("../prisma/prisma.client")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserController = {
    register: async (req, res) => {
        const { email, password, name } = req.body;

        if(!email || !password || !name){
            return res.status(400).json("Все поля обязательны!")
        }

        try {
            const existingUser = await prisma.user.findUnique(({ where: {email}}));

            if(existingUser){
                return res.status(400).json("Пользователь уже существует!")
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            res.json("Вы успешно зарегестрировались!")
        } catch (error) {
            res.status(500).json('Ошибка регистрации!'); 
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json("Все поля обязательны!")
        }

        try {
            const user = await prisma.user.findUnique(({where: { email }}))

            if(!user){
                return res.status(400).json('Неверный логин или пароль!')
            }

            const valid = await bcrypt.compare(password, user.password);

            if(!valid){
                return res.status(400).json("Неверный логин или пароль!")
            }

            const token = jwt.sign(({ userId: user.id }), process.env.SECRET_KEY)

            res.json({token, user})
        } catch (error) {
            res.status(500).json("Ошибка входа!")
        }
    }
}

module.exports = UserController;