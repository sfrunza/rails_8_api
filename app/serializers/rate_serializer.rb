class RateSerializer
  include JSONAPI::Serializer

  attributes :id,
             :extra_mover_rate,
             :extra_truck_rate,
             :enable,
             :name,
             :color,
             :movers_rates
end
