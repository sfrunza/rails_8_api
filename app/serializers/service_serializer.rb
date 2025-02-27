class ServiceSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :enabled, :index, :is_default, :miles_setting
end
