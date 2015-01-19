```mongo
weather> db.data.find({"Wind Direction": { $gt: 180, $lt: 360}}).sort({"Temperature": 1}).limit(1)
{ "_id" : ObjectId("54bc8929afddc5be22f6868e"), "Day" : 24, "Time" : 153, "State" : "New Mexico", "Airport" : "SAF", "Temperature" : 0,
"Humidity" : 87, "Wind Speed" : 5, "Wind Direction" : 260, "Station
Pressure" : 23.88, "Sea Level Pressure" : 274 }
```

```mongo
weather> db.data.find({"Wind Direction": { $gte: 180, $lte: 360}}, {"State":1}).sort({"Temperature": 1}).limit(1)
{ "_id" : ObjectId("54bc8929afddc5be22f6868e"), "State" : "New Mexico" }
```
