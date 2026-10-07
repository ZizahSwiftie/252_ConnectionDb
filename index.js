import express from 'express'
import pg from 'pg'
const app = express()
const port = 3001
const { Pool } = pg

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'postgres', // sesuaikan dengan password database masing-masing
    port: 5432,
})

app.get('/', (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('Select * from biodata')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('internal Server Error');
        });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})