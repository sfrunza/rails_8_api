class Api::V1::PackingsController < ApplicationController
  skip_before_action :authenticate
  before_action :set_packings, only: %i[show update destroy]

  # GET /packings
  def index
    packings = Packing.all.order(:index)
    serialized_data = PackingSerializer.new(packings).serializable_hash[:data]
    response_data = serialized_data.map { |s| s[:attributes] }

    render json: response_data
  end

  # GET /packings/1
  def show
    render json: @packing
  end

  # POST /packings
  def create
    @packing = Packing.new(packing_params)

    if @packing.save
      render json: @packing, status: :created
    else
      render json: @packing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /packings/1
  def update
    if @packing.update(packing_params)
      render json: @packing
    else
      render json: @packing.errors, status: :unprocessable_entity
    end
  end

  # POST /packings/bulk_update
  def bulk_update
    @packings = params[:packings]

    @packings.each do |packing|
      p = Packing.find(packing[:id])
      p.update(
        index: packing[:index],
        name: packing[:name],
        description: packing[:description],
        labor_increase: packing[:labor_increase]
      )
    end
    render json: @packings, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Service not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /packings/1
  def destroy
    @packing.destroy!
  end

  private

  def set_packings
    @packing = Packing.find(params.expect(:id))
  end

  def packing_params
    params.expect(packing: %i[name description is_default labor_increase index])
  end
end
