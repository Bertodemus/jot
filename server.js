// ==============================================================================
// DEPENDENCIES
// ==============================================================================
var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================
var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('db'))

// ==============================================================================
// ROUTER
// ==============================================================================
require("./public/assets/routes/apiRoutes")(app);
require("./public/assets/routes/htmlRoutes")(app);

// ==============================================================================
// LISTENER
// ==============================================================================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
