const mongoose = require('mongoose');
const slugify = require('slugify');

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    totalScore: {
        type: Number,
        default: 0
    },
    slug: {
        type: String, 
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


UsersSchema.pre('validate', function(next){
    if (this.username){
        this.slug = slugify(this.username, 
            {lower: true, strict: true}
            )
    }
    console.log(this.slug)
    next()
})

module.exports = mongoose.model('Users', UsersSchema);