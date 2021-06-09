// eslint-disable-next-line no-undef
const express = require('express');
const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

const agent = require('./router/index')
const menu= require('./router/menu')
//const agentpage= require('./router/agent')
const agentlist= require('./router/agentlist')
// view engine setup
app.set('view engine', 'ejs');

// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json())
app.use(express.static('./public'))

//Set path

app.use('/',menu)
app.use('/agentlist',agentlist)
app.use('/api/agent', agent)
app.all('*', (req, res) => {
    res.status(404).send(`<h1>Resource not found </h1>`)
  })

//start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});