const router                  = require('express').Router()
const { User, Post, Comment } = require('../models')

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'contents', 'post_id', 'commenter_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }))

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('login')
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'contents', 'post_id', 'commenter_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'Could not find post with this id' })
            return
        }

        const post = data.get({ plain: true })

        res.render('post', { post })
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router