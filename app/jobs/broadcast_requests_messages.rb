class BroadcastRequestsMessages < ApplicationJob
  queue_as :default

  def perform(user_id)
    requests_with_messages =
      Request
        .joins(:messages)
        .select("requests.*, MAX(messages.created_at) AS last_message_at")
        .group("requests.id")
        .order("last_message_at DESC")

    formatted_results =
      requests_with_messages.map do |request|
        new_messages_count =
          request.messages.count do |message|
            !message.viewed_by.include?(user_id)
          end

        {
          id: request.id,
          customer: {
            first_name: request.customer.first_name,
            last_name: request.customer.last_name
          },
          status: request.status,
          last_message_at: request.last_message_at,
          last_message: request.messages.order(created_at: :desc).first.body,
          new_messages_count: new_messages_count
        }
      end

    ActionCable.server.broadcast(
      "chats_#{user_id}",
      { data: formatted_results }
    )
  end
end
