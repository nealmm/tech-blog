const User    = require('./User')
const Post    = require('./Post')
const Comment = require('./Comment')

User.hasMany(Post, {
    foreignKey: 'creator_id'
})

Post.belongsTo(User, {
    foreignKey: 'creator_id'
})

Comment.belongsTo(User, {
    foreignKey: 'commenter_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

User.hasMany(Comment, {
    foreignKey: 'commenter_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Comment }