use enron;

//db.messages.findOne();

db.messages.aggregate([
  {
    $match: {
      $or:[
        { 'headers.From': 'susan.mara@enron.com' },
        { 'headers.From': 'soblander@carrfut.com' },
        { 'headers.From': 'evelyn.metoyer@enron.com' },
      ]
    }
  },
  { $unwind: '$headers.To' },
  {
    $project: {
      _id: '$headers.To',
      to: '$headers.To',
      from: '$headers.From',
    }
  },
  {
    $group: {
      _id: { 
        from: '$from',
        to: '$to',
      },
      sum: { $sum: 1 }
    }
  },
  { $sort: { sum: -1 } },
  { $limit: 1 }
]).pretty();
