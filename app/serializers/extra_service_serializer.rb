class ExtraServiceSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :price, :enabled, :index
end
