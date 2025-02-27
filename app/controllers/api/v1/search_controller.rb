class Api::V1::SearchController < ApplicationController
  before_action :authenticate

  # GET /search
  def index
    query = params[:query]
    if query.blank?
      render json: {
               error: "Query parameter is required"
             },
             status: :unprocessable_entity and return
    end

    requests =
      Request
        .joins(:customer)
        .where(
          "users.first_name ILIKE :q OR users.last_name ILIKE :q OR users.email ILIKE :q OR users.phone ILIKE :q OR requests.id::text ILIKE :q OR requests.origin->>'city' ILIKE :q OR requests.destination->>'city' ILIKE :q",
          q: "%#{query}%"
        )
        .limit(20)

    serialized_data =
      RequestSearchSerializer.new(
        requests,
        { params: { query: query } }
      ).serializable_hash[
        :data
      ]
    response_data = serialized_data.map { |s| s[:attributes] }

    render json: response_data
  end
end
