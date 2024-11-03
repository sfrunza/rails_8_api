class CreatePackingServices < ActiveRecord::Migration[8.0]
  def change
    create_table :packing_services do |t|
      t.string :name
      t.text :description
      t.boolean :is_default, default: false
      t.integer :labor_increase
      t.integer :index

      t.timestamps
    end
  end
end
