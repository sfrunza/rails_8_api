class Message < ApplicationRecord
  belongs_to :request
  belongs_to :user

  validates :body, presence: true
  validates :sender_role, inclusion: { in: %w[customer manager admin] }

  before_create :initialize_viewed_by

  after_save_commit :broadcast_unviewed_count

  private

  def initialize_viewed_by
    self.viewed_by ||= []
  end

  def broadcast_unviewed_count
    user_ids_to_notify = User.pluck(:id) - viewed_by
    user_ids_to_notify.each do |user_id|
      BroadcastNotifications.perform_later(user_id)
      BroadcastRequestsMessages.perform_later(user_id)
    end
  end
end
