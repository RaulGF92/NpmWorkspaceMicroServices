import express from 'express'
import HelloI18n from 'hello-i18n'

const app = express()
const port = 3000

app.get('/temp', (req, res) => {
    res.json({ temp: Math.random() + 15.6 })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
