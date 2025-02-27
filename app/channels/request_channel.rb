class RequestChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "request_#{params[:request_id]}"
    stream_for Request.find(params[:request_id])
  end

  def unsubscribed
    # stop_stream_for "request_#{params[:request_id]}"
  end
end
