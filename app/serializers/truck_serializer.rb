class TruckSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :is_active
end
