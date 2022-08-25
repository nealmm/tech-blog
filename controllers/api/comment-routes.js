const router  = require('express').Router()
const { response } = require('express')
const Comment = require('../../models')

router.get('/', (req, res) => {
    Comment.findAll({
        order: [['created_at', 'DESC']]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            contents: req.body.contents,
            post_id: req.body.post_id,
            commenter_id: req.session.user_id
        }).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(400).json(err)
        })
    }
})

router.delete('/:id', (req, res) => {
    Comment.destory({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'Could not find comment with this id' })
            return
        }

        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router