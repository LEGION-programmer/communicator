const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/betterMessage'

mongoose.set('strictQuery', false)

try{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Connected whith db'))

}catch(e){
    console.log(e)
}