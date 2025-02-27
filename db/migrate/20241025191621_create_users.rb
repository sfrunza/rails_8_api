class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :email
      t.string :add_email
      t.string :phone
      t.string :add_phone
      t.integer :role, default: 5

      t.timestamps
    end
  end
end
