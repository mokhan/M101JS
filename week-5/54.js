use test;
db.zips.count()

db.zips.aggregate([
  {
  $project: {
    first_char: { $substr: ["$city", 0, 1] },
    population: '$pop',
  }
},
{
  $group: { 
    _id: '$first_char',
    sum: { $sum: '$population' }
  }
},
{
  $match: {
    $or: [
      { _id: '0' },
      { _id: '1' },
      { _id: '2' },
      { _id: '3' },
      { _id: '3' },
      { _id: '4' },
      { _id: '5' },
      { _id: '6' },
      { _id: '7' },
      { _id: '8' },
      { _id: '9' },
    ],
  }
},
{
  $project: {
    _id: {},
    sum: 1
  }
},
{
  $group: {
    _id: {},
    sum: { $sum: "$sum" }
  }
}
])
