class BroadcastNotifications < ApplicationJob
  queue_as :default

  def perform(user_id)
    notifications_count =
      Message.where.not("viewed_by @> ?", [user_id].to_json).count

    puts "------------------------------------Broadcasting to notifications_- ---------------------#{notifications_count}"

    ActionCable.server.broadcast(
      "notifications_#{user_id}",
      { notifications_count: notifications_count }
    )
  end
end
