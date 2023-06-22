const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRoutes')
const path = require('path');
const PORT = process.env.PORT || 3001

const app = express()


app.get('/', (request, response) => {
    response.send('<h2>Backend Work<h2>')
})


app.use(express.json())

app.use('/', authRouter)

// app.use(express.static(path.join(__dirname, 'C:\Users\Linkln\Desktop\Proiecte\gimnaziu\src\App.js')));



const start = async () => {
  try{
    await mongoose.connect(`mongodb+srv://user:user123@atlascluster.6aobwop.mongodb.net/GimnaziulCasunca?retryWrites=true&w=majority`)
    app.listen(PORT, ()=>console.log(`server work on port ${PORT}`))
  }catch(e){
    console.log(e)
  }
}


start()

module.exports = app