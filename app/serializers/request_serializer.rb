class RequestSerializer
  include JSONAPI::Serializer

  attributes :id,
             :moving_date,
             :status,
             :start_time_window,
             :end_time_window,
             :crew_size,
             :size,
             :rate,
             :sales_notes,
             :driver_notes,
             :customer_notes,
             :dispatch_notes,
             :deposit,
             :travel_time,
             :min_total_time,
             :can_edit_request,
             :paired_request_id,
             :is_moving_from_storage,
             :work_time,
             :total_time,
             :total_price,
             :details,
             :origin,
             :destination,
             :stops,
             :created_at,
             :updated_at,
             :service_id,
             :packing_id,
             :customer_id,
             :truck_ids

  attribute :service do |object|
    { id: object.service.id, name: object.service.name } if object.service
  end

  attribute :packing do |object|
    { id: object.packing.id, name: object.packing.name } if object.packing
  end

  attribute :paired_request do |object|
    if object.paired_request
      {
        id: object.paired_request.id,
        moving_date: object.paired_request.moving_date
      }
    end
  end

  attribute :customer do |object|
    if object.customer
      {
        id: object.customer.id,
        first_name: object.customer.first_name,
        last_name: object.customer.last_name,
        email: object.customer.email,
        phone: object.customer.phone,
        add_email: object.customer.add_email,
        add_phone: object.customer.add_phone
      }
    end
  end
end
