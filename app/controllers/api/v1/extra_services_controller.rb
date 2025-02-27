class Api::V1::ExtraServicesController < ApplicationController
  skip_before_action :authenticate
  before_action :set_extra_service, only: %i[show update destroy]

  # GET /extra_services
  def index
    extra_services = ExtraService.all.order(:index)
    serialized_data =
      ExtraServiceSerializer.new(extra_services).serializable_hash[:data]
    response_data = serialized_data.map { |s| s[:attributes] }

    render json: response_data
  end

  # GET /extra_services/1
  def show
    render json: @extra_service
  end

  # POST /extra_services
  def create
    @extra_service = ExtraService.new(extra_service_params)
    @extra_service.index = ExtraService.maximum(:index).to_i + 1

    if @extra_service.save
      render json: @extra_service, status: :created
    else
      render json: @extra_service.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /extra_services/1
  def update
    if @extra_service.update(extra_service_params)
      render json: @extra_service
    else
      render json: @extra_service.errors, status: :unprocessable_entity
    end
  end

  # POST /extra_services/bulk_update
  def bulk_update
    @extra_services = params[:extra_services]

    @extra_services.each do |service|
      s = ExtraService.find(service[:id])
      s.update(
        name: service[:name],
        price: service[:price],
        enabled: service[:enabled],
        index: service[:index]
      )
    end
    render json: @extra_services, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Service not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /extra_services/1
  def destroy
    @extra_service.destroy!
  end

  private

  def set_extra_service
    @extra_service = ExtraService.find(params.expect(:id))
  end

  def extra_service_params
    params.expect(extra_service: %i[name price enabled index])
  end
end
