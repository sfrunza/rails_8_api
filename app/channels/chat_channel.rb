class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:request_id]}"
  end

  def unsubscribed
    stop_stream_for "chat_#{params[:request_id]}"
  end
end
