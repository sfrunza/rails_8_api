class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.references :request, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :sender_role, null: false
      t.jsonb :viewed_by, default: []

      t.timestamps
    end
  end
end
