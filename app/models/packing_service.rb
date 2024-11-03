class PackingService < ApplicationRecord
  # has_many :requests

  validates :name, presence: true
end
