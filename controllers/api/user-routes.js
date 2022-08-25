const router = require('express').Router()
const User   = require('../../models/User')

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'created_at']
          },
          {
            model: Comment,
            attributes: ['id', 'contents', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
          }
        ]
    })
})

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(data => {
        req.session.save(() => {
            req.session.user_id  = data.id
            req.session.username = data.username
            req.session.loggedIn = true
      
            res.json(data)
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(data => {
        if (!data) {
            res.status(400).json({ message: 'Could not find user with this username' })
            return
        }

        const validPassword = data.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' })
            return
        }

        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
      
            res.json({ user: data, message: 'You are now logged in' });
        })
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
})

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'Could not find user with this id' })
            return
        }

        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'Could not find user with this id' })
            return
        }

        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router