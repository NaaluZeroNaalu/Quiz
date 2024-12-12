app.get("/", (req, res) => {
  // Query the database
  db.all("SELECT * FROM usersdetails1", [], (err, rows) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send("Error fetching data from database.");
      }

      // Render the EJS template and pass the data (rows)
      res.render("index", { data: rows });
  });
});