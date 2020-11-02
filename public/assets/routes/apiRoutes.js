// ==============================================================================
// DEPENDENCIES
// ==============================================================================
var fs = require('fs');
var uuid = require("uuid");

// ==============================================================================
// ROUTES FOR API
// ==============================================================================
module.exports = function(app) {

  //GET method
  app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", (err, data) => {
     var parsedNote = JSON.parse(data);
     res.json(parsedNote);
    });
  });

  //POST method
  app.post("/api/notes", function(req, res) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4()
    }

    fs.readFile("./db/db.json", (err, data) => {
      var parsedNote = JSON.parse(data);
      parsedNote.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(parsedNote), function(err, result) {
        if(err) console.log('error', err);
      });
    });
    res.send("updated");
  });


  //DELETE method
  app.delete("/api/notes/:id", function(req, res) {
    fs.readFile("./db/db.json", (err, data) => {
      var parsedNote = JSON.parse(data);
      var newNote = parsedNote.filter(note => note.id !== req.params.id);
      fs.writeFile("./db/db.json", JSON.stringify(newNote), function(err, result) {
        if(err) console.log('error', err);
      });
    });
    res.send("updated");
  });

}