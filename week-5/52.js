use test;
db.zips.aggregate([
  {
    $match: {
      $or: [{ state: 'CA'}, { state: 'NY'}],
      pop: { $gte: 25000 }
    }
  },
  {
    $project: {
      _id: 0,
      //state: '$state',
      population: '$pop',
    }
  },
  {
    $group: {
      _id: '$state',
      average: { $avg: '$population' }
    }
  },
])
