class CalendarRateSerializer
  include JSONAPI::Serializer

  attributes :id,
             :enable_automation,
             :enable_auto_booking,
             :is_blocked,
             :rate_id

  # Add custom method for formatting date
  attribute :formatted_date do |calendar_rate|
    calendar_rate.date.strftime("%m-%d-%Y")
  end

  attribute :rate do |calendar_rate|
    if calendar_rate.rate
      {
        id: calendar_rate.rate.id,
        name: calendar_rate.rate.name,
        color: calendar_rate.rate.color,
        movers_rates: calendar_rate.rate.movers_rates,
        extra_mover_rate: calendar_rate.rate.extra_mover_rate,
        extra_truck_rate: calendar_rate.rate.extra_truck_rate
      }
    else
      nil
    end
  end
end
