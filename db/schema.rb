# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_11_03_152557) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "calendar_rates", force: :cascade do |t|
    t.date "date"
    t.boolean "enable_automation"
    t.boolean "enable_auto_booking"
    t.boolean "is_blocked"
    t.bigint "rate_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date"], name: "index_calendar_rates_on_date"
    t.index ["rate_id"], name: "index_calendar_rates_on_rate_id"
  end

  create_table "moving_services", force: :cascade do |t|
    t.string "name"
    t.boolean "enabled", default: true
    t.integer "miles_setting"
    t.integer "index"
    t.boolean "is_default", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "packing_services", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "is_default", default: false
    t.integer "labor_increase"
    t.integer "index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rates", force: :cascade do |t|
    t.integer "extra_mover_rate"
    t.integer "extra_truck_rate"
    t.boolean "enable"
    t.string "name"
    t.string "color"
    t.jsonb "movers_rates", default: {"2"=>{"hourly_rate"=>10000}, "3"=>{"hourly_rate"=>10000}, "4"=>{"hourly_rate"=>10000}, "5"=>{"hourly_rate"=>10000}, "6"=>{"hourly_rate"=>10000}, "7"=>{"hourly_rate"=>10000}, "8"=>{"hourly_rate"=>10000}, "9"=>{"hourly_rate"=>10000}, "10"=>{"hourly_rate"=>10000}}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trucks", force: :cascade do |t|
    t.string "name"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_trucks_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.string "email"
    t.string "phone"
    t.integer "role", default: 5
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "calendar_rates", "rates"
end
