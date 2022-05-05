# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |n|
  User.create!(
    email: "#{n + 1}test@test.com",
    name: "#{n + 1}test-user",
    password: "password",
  )
end

user = User.find_by(email:"rails@gmail.com")

user.posts.create!(word_text: "しりとり")
user.posts.create!(word_text: "りんご")
user.posts.create!(word_text: "ごりら")
