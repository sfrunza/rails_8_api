class RequestDateSerializer
  include JSONAPI::Serializer

  attributes :id,
             :moving_date,
             :status,
             :start_time_window,
             :end_time_window,
             :size,
             :total_time,
             :truck_ids

  attribute :customer do |object|
    if object.customer
      {
        first_name: object.customer.first_name,
        last_name: object.customer.last_name
      }
    end
  end

  attribute :origin do |object|
    { city: object.origin["city"], state: object.origin["state"] }
  end

  attribute :destination do |object|
    { city: object.destination["city"], state: object.destination["state"] }
  end
end
