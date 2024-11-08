class Api::V1::PackingServicesController < ApplicationController
  skip_before_action :authenticate
  before_action :set_packing_service, only: %i[show update destroy]

  # GET /packings
  def index
    packing_services = PackingService.all.order(:index)
    serialized_data =
      PackingServiceSerializer.new(packing_services).serializable_hash[:data]
    response_data = serialized_data.map { |s| s[:attributes] }

    render json: response_data
  end

  # GET /packings/1
  def show
    render json: @packing_service
  end

  # POST /packings
  def create
    @packing_service = PackingService.new(packing_service_params)

    if @packing_service.save
      render json: @packing_service, status: :created
    else
      render json: @packing_service.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /packings/1
  def update
    if @packing_service.update(packing_service_params)
      render json: @packing_service
    else
      render json: @packing_service.errors, status: :unprocessable_entity
    end
  end

  # POST /packing_services/bulk_update
  def bulk_update
    @packing_services = params[:packing_services]

    @packing_services.each do |packing|
      p = PackingService.find(packing[:id])
      p.update(
        index: packing[:index],
        name: packing[:name],
        description: packing[:description],
        labor_increase: packing[:labor_increase]
      )
    end
    render json: @packing_services, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Service not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /packing_services/1
  def destroy
    @packing_service.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_packing_service
    @packing_service = PackingService.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def packing_service_params
    params.expect(
      packing_service: %i[name description is_default labor_increase index]
    )
  end
end
