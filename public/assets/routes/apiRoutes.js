// const notes = require("../../../db/db.json");
var fs = require('fs');
var uuid = require("uuid");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", (err, data) => {
     var parsedNote = JSON.parse(data);
     res.json(parsedNote);
    });
  });

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

};


// app.delete("/api/notes/:id", function(req, res){
    
//   var uniqueId = req.params.id;

//   fs.readFile("Develop/db/db.json", (err, data) => {

//     var parsed = JSON.parse(data)
//     var remove = parsed.filter(note => note.id !== uniqueId)
//     fs.writeFile("Develop/db/db.json", JSON.stringify(remove), err => {
//       if(err) throw err;
//       res.send("Note deleted!");
//     })

//   })
 
// }); 
// Tanner Kirkpatrick12:57 PM
// app.get("/api/notes", function(req, res) {
// fs.readFile("Develop/db/db.json", (err, data) => {
//   if (err){
//     throw err;
//   }
//   res.json(JSON.parse(data));
// })
// });