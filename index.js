require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

let urls = [];
let id = 1;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', (req, res) => {
  let url;
  try {
    url = new URL(req.body.url)
  } catch (err) {
    res.json({ error: 'invalid url' })
  }
  dns.lookup(url.hostname, (err) => {
    if (err) return res.json({ error: 'invalid url' });

    urls.push({ original_url: req.body.url, short_url: id });
    res.json({ original_url: req.body.url, short_url: id });
    id++;
  })
});

app.get('/api/shorturl/:short', (req, res) => {
  const entry = urls.find(u => u.short_url == req.params.short);
  if (entry) {
    res.redirect(entry.original_url);
  } else {
    res.json({ error: 'No short URL found' });
  };
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
