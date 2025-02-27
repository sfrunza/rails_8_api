class Packing < ApplicationRecord
  validates :name, presence: true

  has_many :requests
end
