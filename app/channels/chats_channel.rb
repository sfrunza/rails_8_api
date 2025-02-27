class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chats_#{params[:user_id]}"
  end

  def unsubscribed
    stop_stream_for "chats_#{params[:user_id]}"
  end
end
