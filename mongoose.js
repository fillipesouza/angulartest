var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exampleDb');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected");
  var kittySchema = mongoose.Schema({
    name: String
  });		
 

//  var Kitten = mongoose.model('Kitten', kittySchema);  

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }


  var Kitten = mongoose.model('Kitten', kittySchema);


  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  var fluffy = new Kitten({ name: 'Fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  fluffy.speak();
  });

  Kitten.find(function (err, kittens) {
	  if (err) return console.error(err);
	  console.log(kittens);
	kittens.forEach(function(kitt){
		//console.log(kitt.name);
	});
  });

  Kitten.find({ name: /^Fluffya/ }, function(err,arr){
	//console.log(arr);
	arr.forEach(function(kit){
		console.log(kit.name);
	});
  });
	
	
});
