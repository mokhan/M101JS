db.posts.aggregate([
{ $project: { comments: 1 } },
{ $unwind: '$comments' },
{ $group: { _id: '$comments.author', comment_count: { $sum: 1 } } },
{ $sort: { comment_count: -1 } },
{ $limit: 1 }
])
