var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(error, db) {
  if(error) throw error;

  var options = {
    'sort': [['State', 1], ["Temperature", -1]]
  };
  var cursor = db.collection('data').find({}, {}, options);
  var state = null;

  function addMonthHighTo(document) {
    db.collection('data').update({'_id': document['_id']}, { '$set' : { month_high: true } }, function(error, updated){
      if(error) throw error;
      console.dir('updated ' + updated + ' document!');
    });
  }
  cursor.each(function(error, document){
    if(error) throw error;
    //if (document == null) { return db.close(); }

    if(!state) {
      state = document['State'];
      console.log('CHANGED To ' + document['State']);

      addMonthHighTo(document);
    }
    if(state === document['State']){
      //console.log('SAME STATE');
    }
    else {
      console.log('CHANGED To ' + document['State']);
      state = document['State'];
      addMonthHighTo(document);
    }
    //console.log(state + ' ' + document['State'] + ' ' + document['Temperature'])
    //console.dir(document);
  });
});
