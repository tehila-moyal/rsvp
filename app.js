const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

let port= process.env.PORT || 3052;

let nodeEnv = process.env.NODE_ENV.toLowerCase();
global.hostingDir =  nodeEnv==='development' ? '' : '/tehila/08-NodeJS-SQL-plants';


// Database connection

const db = mysql.createConnection({
  host: 'localhost', // or '127.0.0.1'
  port: 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/rsvp', (req, res) => {
  const { name, email, attending } = req.body;
  console.log( name, email, attending );
  
  const query = 'INSERT INTO guests (name, email, attending) VALUES (?, ?, ?)';

  db.query(query, [name, email, attending], (err) => {
    if (err) {
      console.error('Error saving RSVP:', err);
      // res.status(500).send('Error saving RSVP.');
      res.redirect('/error');

      return;
    }
    res.redirect('/thank-you');
  });
});

app.get('/thank-you', (req, res) => {
  res.render('thank-you');
});

app.get('/error', (req, res) => {
  res.render('err');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});