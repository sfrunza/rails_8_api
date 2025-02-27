class PackingSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :description, :is_default, :labor_increase, :index
end
