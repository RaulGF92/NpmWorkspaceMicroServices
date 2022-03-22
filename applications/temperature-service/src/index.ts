import express from 'express'
import HelloI18n from 'hello-i18n'

const app = express()
const port = 3000

app.get('/hi', (req, res) => {
    const userName = 'Raúl'
    res.json({ msg: HelloI18n.getHelloByLanguage() + userName })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
