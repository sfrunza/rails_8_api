class Api::V1::MovingServicesController < ApplicationController
  skip_before_action :authenticate
  before_action :set_moving_service, only: %i[show update destroy]

  # GET /moving_services
  def index
    @moving_services = MovingService.all.order(:index)

    render json: @moving_services
  end

  # GET /moving_services/1
  def show
    render json: @moving_service
  end

  # POST /moving_services
  def create
    @moving_service = MovingService.new(moving_service_params)

    if @moving_service.save
      render json: @moving_service, status: :created
    else
      render json: @moving_service.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /moving_services/1
  def update
    if @moving_service.update(moving_service_params)
      render json: @moving_service
    else
      render json: @moving_service.errors, status: :unprocessable_entity
    end
  end

  # POST /moving_services/bulk_update
  def bulk_update
    @moving_service = params[:services]

    @moving_service.each do |service|
      s = MovingService.find(service[:id])
      s.update(
        index: service[:index],
        name: service[:name],
        enabled: service[:enabled]
      )
    end
    render json: @moving_service, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Service not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /moving_services/1
  def destroy
    @moving_service.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_moving_service
    @moving_service = MovingService.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def moving_service_params
    params.expect(moving_service: %i[name enabled miles_setting index])
  end
end
