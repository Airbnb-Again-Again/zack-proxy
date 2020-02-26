require('newrelic');

const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

app.get('/api/:id', (req, res) => {
  axios.get('http://localhost:1337' + req.url)
    .then((innerRes) => {
      res.writeHead(200);
      console.log(innerRes.data);
      res.write(JSON.stringify(innerRes.data));
      res.end();
    })
    .catch((err) => {console.log(err)});
});

app.get('/v1/api/:accommodationId/reviews', (req,res) => {
  axios.get('http://localhost:2020' + req.url)
    .then((innerRes) => {
      res.writeHead(200);
      res.write(JSON.stringify(innerRes.data)); 
      res.end();
    })
    .catch((err) => {
      res.writeHead(500);
      res.end();
      console.log(err)
    });
});

app.get('/getHomes', (req,res) => {
  // axios.get('http://localhost:4321' + req.url)
  let zip = req.query.zip
  console.log(zip);
  axios.get('http://localhost:4321/related-homes/getHomes')
    .then((innerRes) => {
      res.writeHead(200);
      res.write(JSON.stringify(innerRes.data));
      res.end();
    })
    .catch((err) => {
      res.writeHead(500);
      res.end()
      console.log(err);
    });
});

app.post('/getHomes/newListing', (req,res) => {
  axios.post('http://localhost:4321/related-homes/newListing')
    .then((innerRes) => {
      res.writeHead(200);
      res.write(JSON.stringify(innerRes.data));
      res.end();
    })
    .catch((err) => {
      res.writeHead(500);
      res.end()
      console.log(err);
    });
});

app.get('/api/v1/listings', (req,res) => {
  axios.get('http://localhost:3000' + req.url)
    .then((innerRes) => {
      res.writeHead(200);
      res.write(JSON.stringify(innerRes.data));
      res.end();
    })
    .catch((err) => {
      res.writeHead(500);
      res.end();
      console.log(err);
    });
});

app.use(express.static(path.join(__dirname, '../public')));
app.listen(1234, () => {console.log('listening')});
