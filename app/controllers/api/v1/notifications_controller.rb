class Api::V1::NotificationsController < ApplicationController
  before_action :authenticate

  def index
    BroadcastNotifications.perform_later(current_user.id)
  end
end
