class User < ApplicationRecord
  enum :role, %i[admin manager foreman driver helper customer]

  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true
  validates_uniqueness_of :email
  normalizes :email, with: ->(e) { e.strip.downcase }

  has_many :requests, foreign_key: "customer_id"
  has_many :messages, dependent: :destroy

  after_update_commit :broadcast_updated_customer

  def broadcast_updated_customer
    customer_data =
      slice(
        :id,
        :first_name,
        :last_name,
        :email,
        :phone,
        :add_email,
        :add_phone,
        :role
      )
    requests.find_each do |request|
      RequestChannel.broadcast_to(request, { customer: customer_data })
    end
  end
end
