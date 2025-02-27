class Api::V1::RequestsController < ApplicationController
  skip_before_action :authenticate
  before_action :set_request, only: %i[show update destroy pair]

  # GET /requests
  def index
    if current_user.admin? or current_user.manager?
      filter = params[:filter]
      per_page = 20
      page = params[:page].to_i || 1
      offset = (page - 1) * per_page

      pending_statuses = %w[pending pending_info pending_date hold]

      requests = Request.order(id: :desc).limit(per_page).offset(offset)

      case filter
      when "all"
        total_pages = (Request.count.to_f / per_page).ceil
      when "pending"
        requests = requests.where(status: pending_statuses)
        total_pages =
          (Request.where(status: pending_statuses).count.to_f / per_page).ceil
      when filter
        requests = requests.where(status: filter)
        total_pages = (Request.where(status: filter).count.to_f / per_page).ceil
      end

      serialized_data = RequestSerializer.new(requests).serializable_hash[:data]
      response_data = serialized_data.map { |s| s[:attributes] }

      render json: { requests: response_data, total_pages: total_pages }
    else
      render json: { error: "Unauthorized" }
    end
  end

  def dates_with_requests
    input_date = Date.parse(params[:date])
    start_of_month = input_date.beginning_of_month
    end_of_month = input_date.end_of_month

    dates =
      Request
        .where(status: %w[completed confirmed])
        .where(moving_date: start_of_month..end_of_month)
        .pluck(:moving_date)
        .map(&:to_date)

    render json: dates.uniq
  end

  def requests_by_date
    if current_user.admin? or current_user.manager?
      requests =
        Request.where(
          moving_date: params[:moving_date],
          status: %i[confirmed completed]
        )
      serialized_data =
        RequestDateSerializer.new(requests).serializable_hash[:data]
      response_data = serialized_data.map { |s| s[:attributes] }

      render json: response_data
    else
      render json: { error: "Unauthorized" }
    end
  end

  # GET /requests/1
  def show
    render json:
             RequestSerializer.new(@request).serializable_hash[:data][
               :attributes
             ]
  end

  # GET /requests/status_counts
  def status_counts
    pending_statuses = %w[pending pending_info pending_date hold]

    # Count requests by each status
    total_requests_count = Request.group(:status).count

    # Sum up counts of pending-related statuses and store under "pending"
    total_requests_count["pending"] = total_requests_count
      .slice(*pending_statuses)
      .values
      .sum

    # Remove individual counts of pending_info, pending_date, and hold
    pending_statuses[1..].each { |status| total_requests_count.delete(status) }

    # Add total count for all requests
    total_requests_count["all"] = Request.count

    render json: total_requests_count
  end

  # POST /api/v1/requests/:id/pair
  def pair
    paired_request = Request.find(params[:paired_request_id])
    if @request.pair_with(paired_request)
      serialized_data =
        RequestSerializer.new(@request).serializable_hash[:data][:attributes]
      ActionCable.server.broadcast("request_#{params[:id]}", serialized_data)
      render json: @request, serializer: RequestSerializer
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # POST /requests
  def create
    @request = Request.new(request_params.except(:id))

    if @request.save
      render json: @request, status: :created
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /requests/1
  def update
    if @request.update(request_params)
      # ActionCable.server.broadcast(
      #   "request_#{@request.id}",
      #   @request.slice(params[:request].keys)
      # )
      serialized_data =
        RequestSerializer.new(@request).serializable_hash[:data][:attributes]
      render json: serialized_data, status: :ok
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /requests/1
  def destroy
    @request.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_request
    @request = Request.find(params[:id])
  end

  def request_params
    params.require(:request).permit(
      :id,
      :service_id,
      :service,
      :packing_id,
      :packing,
      :customer_id,
      :customer,
      :moving_date,
      :status,
      :size,
      :start_time_window,
      :end_time_window,
      :crew_size,
      :rate,
      :sales_notes,
      :driver_notes,
      :customer_notes,
      :dispatch_notes,
      :deposit,
      :travel_time,
      :min_total_time,
      :can_edit_request,
      :paired_request_id,
      :paired_request,
      :created_at,
      :updated_at,
      :is_moving_from_storage,
      work_time: %i[min max],
      total_time: %i[min max],
      total_price: %i[min max],
      details: %i[
        delicate_items_question_answer
        bulky_items_question_answer
        disassemble_items_question_answer
        comments
        is_touched
      ],
      origin: permit_nested_location_params_with_location,
      destination: permit_nested_location_params_with_location,
      stops: [
        :street,
        :city,
        :state,
        :zip,
        :floor,
        :apt,
        :type,
        location: %i[lat lng] # Permit nested location attributes
      ],
      truck_ids: []
    )
  end

  def permit_nested_location_params
    %i[street city state zip apt floor]
  end

  # Permit nested location attributes with lat/lng within destination
  def permit_nested_location_params_with_location
    permit_nested_location_params + [location: %i[lat lng]]
  end

  def check_permission
    unless @request.editable_by?(@current_user)
      render json: {
               error: "You don't have permission to delete this request."
             },
             status: :forbidden
    end
  end
end
