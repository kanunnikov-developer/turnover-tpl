const { prisma } = require("../prisma/prisma.client")

const ProductController = {
    create: async (req, res) => {
        const {title, description, article, price, expirationDate} = req.body

        const authorId = req.user.userId

        if(!title || !description || !article || !price || !expirationDate){
            return res.status(400).json("Все поля обязательны!")
        }

        try {

            const product = await prisma.product.create({
                data: {
                    title,
                    description,
                    article,
                    price,
                    expirationDate,
                    authorId: authorId
                }
            })

            res.json(product)

        } catch (error) {
            res.status(500).json('Ошибка создания продукта!')
        }
    },
    delete: async (req, res) => {
        const { id } = req.params

        if (typeof id !== 'string' || id.length !== 24) {
            return res.status(400).json("Неверный формат ID"); // ID должен быть строкой длиной 24 символа
        }

        try {
            const product = await prisma.product.findUnique({ where: { id }})

            if(!product){
                return res.status(404).json("Пост не найден!")
            }
    
            if(product.authorId !== req.user.userId){
                return res.status(403).json("Нет доступа!")
            }

            await prisma.product.delete({ where: {id} }) 
            res.json("Успешно удален!");
        } catch (error) {
            res.status(500).json("Ошибка удаления продукта!")
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const { title, description, article, price, expirationDate} = req.body

        if (typeof id !== 'string' || id.length !== 24) {
            return res.status(400).json("Неверный формат ID"); // ID должен быть строкой длиной 24 символа
        }

        try {
            const product = await prisma.product.findUnique({ where: { id } });

            if (!product) {
                return res.status(404).json("Продукт не найден!" );
            }

            if (product.authorId !== req.user.userId) {
                return res.status(403).json("Нет доступа!" );
            }

            await prisma.product.update({ 
                where: { id },
                data: {
                    title: title || undefined,
                    description: description || undefined,
                    article: article || undefined,
                    price: price || undefined,
                    expirationDate: expirationDate || undefined,
                }
            })

            res.json("Данные обновлены!")
        } catch (error) {
            res.status(500).json('Ошибка обновления продукта!')
        }

    },
    getAllProducts: async (req, res) => {

        const userId = req.user.userId;

        try {
            const products = await prisma.product.findMany({
                where:{
                    authorId: userId
                },
                include: {
                    author: true
                }
            })

            res.json(products)

        } catch (error) {
            console.log('Ошибка получения продуктов!', error)
            res.status(500).json('Ошибка получения продуктов!')
        }
    },
    copyProduct: async (req, res) => {
        const { id } = req.params
        const authorId = req.user.userId

        if (typeof id !== 'string' || id.length !== 24) {
            return res.status(400).json("Неверный формат ID"); // ID должен быть строкой длиной 24 символа
        }

        try{
            const product = await prisma.product.findUnique({ 
                where: { id },
                include: {
                    author: true
                }
            });

            if(!product){
                return res.status(404).json('Продукт не найден!')
            }

            if(product.authorId !== req.user.userId){
                return res.status(403).json("Нет доступа!");
            }

            const copyProduct = await prisma.product.create({
                data: {
                    title: product.title,
                    description: product.description,
                    article: product.article,
                    price: product.price,
                    expirationDate: product.expirationDate,
                    authorId: authorId
                }
            })

            res.json(copyProduct)
        } catch {
            res.status(500).json('Ошибка копирования продукта!')
        }

    }

}

module.exports = ProductController;