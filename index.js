const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
require('dotenv').config({path: './.env'});

app.use(express.json());
app.use(cors({ origin: true }));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_LOCAL_PASSWORD,
    database: 'gmailclone'
})

app.post('/', (req, res) => {
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

app.get('/', (req, res) => {
    const query = 'SELECT `to`, subject, message, DATE_FORMAT(time_sent, "%M %D %H:%i") AS "time_sent", clicked, id FROM emails'

    connection.query(query, function(err, results) {
        if (err) throw err
        else {
            console.log('>>>retrieved values<<<')
            res.send(results)
        }
    })
})

app.patch('/', (req, res) => {
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