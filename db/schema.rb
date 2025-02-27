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

ActiveRecord::Schema[8.0].define(version: 2024_11_14_224940) do
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

  create_table "extra_services", force: :cascade do |t|
    t.string "name"
    t.integer "price"
    t.boolean "enabled", default: true
    t.integer "index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "request_id", null: false
    t.bigint "user_id", null: false
    t.string "sender_role", null: false
    t.jsonb "viewed_by", default: []
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["request_id"], name: "index_messages_on_request_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "packings", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "is_default", default: false
    t.integer "labor_increase"
    t.integer "index"
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

  create_table "requests", force: :cascade do |t|
    t.bigint "service_id", null: false
    t.bigint "packing_id", default: 1, null: false
    t.datetime "moving_date"
    t.datetime "delivery_date"
    t.integer "status", default: 0
    t.string "size"
    t.integer "start_time_window"
    t.integer "end_time_window"
    t.integer "start_time_window_delivery"
    t.integer "end_time_window_delivery"
    t.integer "customer_id"
    t.jsonb "work_time", default: {"max"=>0, "min"=>0}
    t.jsonb "total_time", default: {"max"=>0, "min"=>0}
    t.jsonb "total_price", default: {"max"=>0, "min"=>0}
    t.integer "travel_time", default: 0
    t.integer "min_total_time", default: 120
    t.integer "crew_size"
    t.boolean "can_edit_request", default: true
    t.integer "rate"
    t.jsonb "stops", default: []
    t.text "sales_notes"
    t.text "driver_notes"
    t.text "customer_notes"
    t.text "dispatch_notes"
    t.integer "deposit", default: 10000
    t.boolean "is_moving_from_storage", default: false
    t.integer "paired_request_id"
    t.jsonb "details", default: {"comments"=>"", "is_touched"=>false, "bulky_items_question_answer"=>"", "delicate_items_question_answer"=>"", "disassemble_items_question_answer"=>""}
    t.jsonb "origin", default: {"apt"=>"", "zip"=>"", "city"=>"", "floor"=>"", "state"=>"", "street"=>"", "location"=>{"lat"=>0, "lng"=>0}}
    t.jsonb "destination", default: {"apt"=>"", "zip"=>"", "city"=>"", "floor"=>"", "state"=>"", "street"=>"", "location"=>{"lat"=>0, "lng"=>0}}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["moving_date"], name: "index_requests_on_moving_date"
    t.index ["packing_id"], name: "index_requests_on_packing_id"
    t.index ["service_id"], name: "index_requests_on_service_id"
    t.index ["status"], name: "index_requests_on_status"
  end

  create_table "requests_trucks", id: false, force: :cascade do |t|
    t.bigint "request_id", null: false
    t.bigint "truck_id", null: false
    t.index ["request_id", "truck_id"], name: "index_requests_trucks_on_request_id_and_truck_id"
    t.index ["truck_id", "request_id"], name: "index_requests_trucks_on_truck_id_and_request_id"
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.boolean "enabled", default: true
    t.integer "miles_setting"
    t.integer "index"
    t.boolean "is_default", default: false
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
    t.string "add_email"
    t.string "phone"
    t.string "add_phone"
    t.integer "role", default: 5
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "calendar_rates", "rates"
  add_foreign_key "messages", "requests"
  add_foreign_key "messages", "users"
  add_foreign_key "requests", "packings"
  add_foreign_key "requests", "services"
  add_foreign_key "requests", "users", column: "customer_id"
end
