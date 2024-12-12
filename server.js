const sqlite3 = require('sqlite3').verbose();
const express = require("express")
const path = require("path");

const app = express();

app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = new sqlite3.Database('./datas.sqlite', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to SQLite database');
    }
  });

  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS guestdetails (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, score INTEGER)");
  });


app.get("/", (req, res) => {

        res.render("index");
});

app.get("/ajith1", (req, res) => {

  db.all("SELECT * FROM usersdetails1", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users from the database' });
    }

    // Pass the rows to the EJS view
    res.render('displayusers', { users: rows });
  });
});

app.get("/ajith2", (req, res) => {

  db.all("SELECT * FROM guestdetails", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users from the database' });
    }

    // Pass the rows to the EJS view
    res.render('displayusers', { users: rows });
  });
});

app.post("/Authenticateid",(req, res)=>{

  console.log(req.body.name)
  const stmt = db.prepare("INSERT INTO usersdetails1 (name, password) VALUES (?, ?)");
  stmt.run(req.body.name, req.body.password);
  stmt.finalize();
  res.end()

})

app.post("/updatescore",(req, res)=>{
  
  const updateStmt = db.prepare("UPDATE usersdetails1 SET score = ? WHERE name = ?");
  updateStmt.run(req.body.score, req.body.user);
  updateStmt.finalize();
  res.end();

})

app.get("/guest", (req, res) => {

        res.render("guest");
});

app.post("/storeguest",(req, res)=>{

  const stmt = db.prepare("INSERT INTO guestdetails (name, relation, dob) VALUES (?, ?, ?)");
  stmt.run(req.body.name, req.body.relation, req.body.dob);
  stmt.finalize();
  res.end()
})

app.get("/guestscore",(req, res)=>{

  res.render("guestscore")
})



app.get("/displayscore", (req, res) => {

  db.all("SELECT * FROM usersdetails1", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users from the database' });
    }

    // Pass the rows to the EJS view
    res.render('display', { users: rows });
  });
});


app.get("/quiz", (req, res) => {

        res.render("quiz");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

