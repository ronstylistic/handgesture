const express = require("express");
const { engine } = require('express-handlebars');
const app = express();


// setup the database
/* const dbConFig = {
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"root",
    database:"Thesis_Database"
}

const db = pgp(dbConFig); */


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.listen(3000, ()=>{
  console.log('Server is listening')
});

//app.use(express.static(path.join(__dirname, 'statics-file')))

app.get('/', (req, res) => {
   
    const data = [{
        id: 1,
        name: "Burger",
        price: 200
    },
    {
        id: 2,
        name: "Cheese",
        price: 100
    },
    {
        id: 3,
        name: "Fries",
        price: 150
    },
    {
        id: 4,
        name: "Coke",
        price: 55
    }];
  
    res.render('index', {data: data});

  /* db.query('SELECT * FROM public."Main"')
  .then(data => {
    res.render("index",{data});
  })
  .catch(error =>{
    res.render("error", {error})
  })
  .finally(()=>{
    pgp.end()
  }); */
});