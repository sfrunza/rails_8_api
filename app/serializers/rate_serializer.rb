class RateSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id,
             :extra_mover_rate,
             :extra_truck_rate,
             :enable,
             :name,
             :color,
             :movers_rates
end
