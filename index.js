const express = require('express');

const handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const routes = require('./routes');

app.use('/', routes);

app.listen(port, function(err) {
    if (err) throw err;

    console.log('listening on port', port);
});
