const express = require('express')
const app = express();
const hbs = require('hbs');
const port = 3000;

app.use(express.static('public'))

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('mainMenu');
  });

  app.get('/game', (req,res)=>{
      res.render('game');
  })

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:3000`)
});