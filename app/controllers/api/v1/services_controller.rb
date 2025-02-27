class Api::V1::ServicesController < ApplicationController
  skip_before_action :authenticate
  before_action :set_service, only: %i[show update destroy]

  # GET /services
  def index
    services = Service.all.order(:index)
    serialized_data = ServiceSerializer.new(services).serializable_hash[:data]
    response_data = serialized_data.map { |s| s[:attributes] }

    render json: response_data
  end

  # GET /services/1
  def show
    render json: @service
  end

  # POST /services
  def create
    @service = Service.new(service_params)

    if @service.save
      render json: @service, status: :created
    else
      render json: @service.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /services/1
  def update
    if @service.update(service_params)
      render json: @service
    else
      render json: @service.errors, status: :unprocessable_entity
    end
  end

  # POST /services/bulk_update
  def bulk_update
    @services = params[:services]

    @services.each do |service|
      s = Service.find(service[:id])
      s.update(
        index: service[:index],
        name: service[:name],
        enabled: service[:enabled]
      )
    end
    render json: @services, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Service not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /services/1
  def destroy
    @service.destroy!
  end

  private

  def set_service
    @service = Service.find(params.expect(:id))
  end

  def service_params
    params.expect(service: %i[name enabled miles_setting index is_default])
  end
end
