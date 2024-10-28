class User < ApplicationRecord
  enum :role, %i[admin manager foreman driver helper customer]

  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, email: true
  validates_uniqueness_of :email
  # validates :role, presence: true, inclusion: { in: roles.keys }

  # Validate presence and inclusion of role

  normalizes :email, with: ->(e) { e.strip.downcase }
end
