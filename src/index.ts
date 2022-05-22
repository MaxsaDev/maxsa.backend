//yarn add express
//yarn add nodemon -D
//yarn add typescript ts-node @types/express @types/node -D

//Run
//Terminal-1
//yarn tsc -ws
//Terminal-2
//yarn nodemon ./dist/index.js
//or
//yarn nodemon --inspect ./dist/index.js


import express from 'express';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})