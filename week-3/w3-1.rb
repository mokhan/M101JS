require 'rubygems'
require 'bundler'

# Remove the lowest homework score for each student.

Bundler.require

def remove_lowest_homework_from_scores(scores)
  homework_scores = scores.find_all do |score|
    score['type'] == 'homework'
  end

  lowest_score = homework_scores.min { |x, y| x['score'] <=> y['score'] }
  scores.delete(lowest_score)

  scores
end

def main
  client = Mongo::MongoClient.new
  db = client['school']
  collection = db['students']

  students = collection.find({'scores.type':'homework'}).to_a
  students.each do |student|
    puts student
    remove_lowest_homework_from_scores(student['scores'])
    collection.update({ "_id" => student['_id']}, student)
  end
end

main
