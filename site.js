var app = require('express')();
var Load = require('ractive-load');
app.use(require('express').static(process.cwd() + '/public'));
var db = require('mongojs').connect('test', ['emails']);

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
  extended: true
}));


app.get('/', function(req, res) {
  Load('views/index.html').then(function(Component) {
    var ractive = new Component({
      data: {}
    });
    res.send(ractive.toHTML());
  }).catch(function(a, b) {
    console.log(a, b)
  });
});

app.post('/newEmail', function(req,res){
  db.emails.insert(req.body);
  res.redirect('http://cssdeck.com/labs/full/jffmx2pi');
});

app.listen(80);
