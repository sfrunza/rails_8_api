class TruckSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :is_active
end
