const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
require('dotenv').config({path: './.env'});

app.use(express.json());
app.use(cors({ origin: true }));


const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b6171e546f87c9',
    password: '3a400cef',
    database: 'heroku_49e8ccb2b0c4f6a'
})

.app.get('/', (req, res) => {
    res.send('backend live')
})

app.post('/api', (req, res) => {
    const data = {
        to: req.body.to,
        subject: req.body.subject,
        message: req.body.message,
    }

    const query = 'INSERT INTO emails SET ?'

    connection.query(query, data, function(err, results) {
        if (err) throw err
        else {
            console.log('>>>values have been inserted<<<')
            res.send(req.body)
        }
    })
})

app.get('/api', (req, res) => {
    const query = 'SELECT `to`, subject, message, DATE_FORMAT(time_sent, "%M %D %H:%i") AS "time_sent", clicked, id FROM emails'

    connection.query(query, function(err, results) {
        if (err) throw err
        else {
            console.log('>>>retrieved values<<<')
            res.send(results)
        }
    })
})

app.patch('/api', (req, res) => {
    const emailId = req.body.id

    console.log(emailId)

    const query = 'UPDATE emails SET clicked = 1 WHERE id = ?'

    connection.query(query, [emailId], function(err, results) {
        if (err) throw err
        else {
            console.log(results)
            res.send(req.body)
        }
    })

})

app.listen(process.env.PORT || 3001, () => {
    console.log('Server live on port 3001')
})