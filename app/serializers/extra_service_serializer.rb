class ExtraServiceSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :price, :enabled, :index
end
