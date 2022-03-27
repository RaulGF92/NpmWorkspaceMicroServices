import axios from 'axios';
import express from 'express'
import HelloI18n from 'hello-i18n';

const app = express()
const port = 3000

const getTemperature = async () => {
   const response = await axios({
        method: 'get',
        url: 'http://temperature-service:3000/temp'
    });

    return response.data.temp;
};

app.get('/hi', async (req, res) => {
    const lang = req.query.lang as string;
    const userName = 'Raúl'
    res.json({ msg: HelloI18n.getHelloByLanguage(lang) + " " + userName, temp: `The temp is ${await getTemperature()}` });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
