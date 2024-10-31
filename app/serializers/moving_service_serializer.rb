class MovingServiceSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :enabled, :index, :is_default
end
