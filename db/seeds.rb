# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
puts "Deleting old records..."

User.delete_all
MovingService.delete_all
Rate.delete_all
Truck.delete_all
PackingService.delete_all

User.create!(
  first_name: "Aurel",
  last_name: "Busuioc",
  email: "frunza_sergiu@mail.ru",
  password: "111111",
  role: 0
)

User.create!(
  first_name: "Sergiu",
  last_name: "Frunza",
  email: "frunza.sergiu3@gmail.com",
  password: "111111"
)

MovingService.create!(
  name: "Local move",
  enabled: true,
  miles_setting: 150,
  index: 0,
  is_default: true
)

MovingService.create!(
  name: "Flat Rate",
  enabled: true,
  miles_setting: 150,
  index: 1,
  is_default: true
)

MovingService.create!(
  name: "Loading help",
  enabled: true,
  miles_setting: 0,
  index: 2,
  is_default: true
)

MovingService.create!(
  name: "Unloading help",
  enabled: true,
  miles_setting: 0,
  index: 3,
  is_default: true
)

MovingService.create!(
  name: "Inside move",
  enabled: true,
  miles_setting: 0,
  index: 4,
  is_default: true
)

MovingService.create!(
  name: "Packing only",
  enabled: true,
  miles_setting: 0,
  index: 5,
  is_default: true
)

MovingService.create!(
  name: "Moving & Storage",
  enabled: true,
  miles_setting: 0,
  index: 6,
  is_default: true
)

MovingService.create!(
  name: "Overnight truck Storage",
  enabled: true,
  miles_setting: 0,
  index: 7,
  is_default: true
)

Rate.create(name: "Discount", color: "#000000", enable: true)
Rate.create(name: "Regular", color: "#000000", enable: true)
Rate.create(name: "Subpeak", color: "#000000", enable: true)
Rate.create(name: "Peak", color: "#000000", enable: true)
Rate.create(name: "High Peak", color: "#000000", enable: true)

Truck.create(name: "18 FT")
Truck.create(name: "20 FT")

PackingService.create(
  name: "I will pack by myself",
  description: "This is some description.",
  is_default: true,
  labor_increse: 0,
  index: 0
)

PackingService.create(
  name: "I need Partial Packing Help",
  description: "This is some description.",
  is_default: false,
  labor_increse: 25,
  index: 1
)

PackingService.create(
  name: "I need Full Packing Service",
  description: "This is some description.",
  is_default: false,
  labor_increse: 50,
  index: 2
)

puts "Seeding complete!"
