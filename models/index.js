const User = require('./User')
const Post = require('./Post')

User.hasMany(Post, {
    foreignKey: 'creator_id'
})

Post.belongsTo(User, {
    foreignKey: 'creator_id'
})

module.exports = { User, Post }