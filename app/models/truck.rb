class Truck < ApplicationRecord
  # has_and_belongs_to_many :requests, serializer: RequestSerializer

  validates :name, presence: true
end
