require 'rubygems'
require 'bundler'
Bundler.require

def main
  client = Mongo::MongoClient.new
  db = client['final7']
  images_collection = db['images']
  albums_collection = db['albums']

  albums = albums_collection.aggregate([
    { '$unwind': '$images' }, 
    { '$project': { '_id': '$images' } },
    { '$group': { '_id': '$_id', count: { '$sum': 1 } } },
  ])
  used_images = albums.reduce({}) do |memo, image|
    memo[image['_id']] = true
    memo
  end
  images = images_collection.find().to_a
  deleted = 0
  images.each do |image|
    image_id = image['_id']
    if used_images.key?(image_id) == false
      puts "Deleting: #{image_id}"
      #images_collection.remove("_id": image_id)
      deleted += 1
    end
  end
  puts "USED: #{used_images.size}"
  puts "DELETED: #{deleted}"
  puts "TOTAL: #{images_collection.find.count}"

  tagged_kittens = images_collection.find({ 'tags': 'kittens' }).count()
  puts "Kittens: #{tagged_kittens}"
end

main
