class Api::V1::MessagesController < ApplicationController
  before_action :authenticate
  before_action :set_request, only: %i[index create]

  # GET /api/v1/requests/:request_id/messages
  def index
    messages = @request.messages.order(updated_at: :asc)

    messages.each do |message|
      unless message.viewed_by.include?(current_user.id)
        message.viewed_by << current_user.id
        message.viewed_by.uniq!
        message.save
      end
    end

    BroadcastNotifications.perform_later(current_user.id)
    BroadcastRequestsMessages.perform_later(current_user.id)

    serialized_data = MessageSerializer.new(messages).serializable_hash[:data]
    response_data = serialized_data.map { |s| s[:attributes] }
    render json: response_data
  end

  # POST /api/v1/requests/:request_id/messages
  def create
    message =
      @request.messages.new(
        message_params.merge(user: current_user, sender_role: current_user.role)
      )

    message.viewed_by << current_user.id
    message.viewed_by.uniq!

    if message.save
      ActionCable.server.broadcast("chat_#{@request.id}", message)
      render json: message, serializer: MessageSerializer, status: :created
    else
      render json: {
               errors: message.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  private

  def set_request
    @request = Request.find(params[:request_id])
  end

  def message_params
    params.require(:message).permit(:body, :user_id, :sender_role)
  end
end
