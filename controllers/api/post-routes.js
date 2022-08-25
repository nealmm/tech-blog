const router         = require('express').Router()
const { Post, User } = require('../../models')

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'contents', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [{ model: User, attributes: ['username'] }]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'contents', 'created_at'],
        include: [{ model: USer, attributes: ['username'] }]
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'Could not find post with this id' })
            return
        }

        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        creator_id: req.body.creator_id
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    Post.update(
    {
        title: req.body.title,
        contents: req.body.contents,
    },
    {
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'Could not find post with this id' })
            return
        }

        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'Could not find post with this id' })
            return
        }

        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router