class MessageSerializer
  include JSONAPI::Serializer

  attributes :id,
             :body,
             :request_id,
             :user_id,
             :sender_role,
             :viewed_by,
             :created_at

  attribute :user do |object|
    { first_name: object.user.first_name, last_name: object.user.last_name }
  end

  attribute :status do |object|
    object.request.status
  end
end
