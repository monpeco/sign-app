# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_17_053604) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "attributes", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.bigint "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_attributes_on_product_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.boolean "active"
    t.string "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "products", force: :cascade do |t|
    t.string "code"
    t.string "name"
    t.float "price"
    t.text "description"
    t.datetime "date_added"
    t.boolean "active"
    t.boolean "deleted"
    t.string "comment"
    t.string "promo"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "stock"
    t.integer "reorder"
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["code"], name: "index_products_on_code", unique: true
    t.index ["name"], name: "index_products_on_name", unique: true
  end

  create_table "properties", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.bigint "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_properties_on_product_id"
  end

  create_table "saledetails", force: :cascade do |t|
    t.integer "quantity"
    t.float "price"
    t.bigint "product_id"
    t.bigint "sale_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_saledetails_on_product_id"
    t.index ["sale_id"], name: "index_saledetails_on_sale_id"
  end

  create_table "sales", force: :cascade do |t|
    t.datetime "date_sale"
    t.string "payer_email"
    t.string "address"
    t.string "payment_type"
    t.datetime "date_payment"
    t.datetime "date_confirmation"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "last_log"
    t.string "user_type"
    t.boolean "active"
    t.string "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "attributes", "products"
  add_foreign_key "products", "categories"
  add_foreign_key "properties", "products"
  add_foreign_key "saledetails", "products"
  add_foreign_key "saledetails", "sales"
end
