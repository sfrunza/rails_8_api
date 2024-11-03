class PackingServiceSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :description, :is_default, :labor_increase, :index
end
