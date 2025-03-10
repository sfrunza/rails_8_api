class Api::V1::TrucksController < ApplicationController
  skip_before_action :authenticate
  before_action :set_truck, only: %i[show update destroy]

  # GET /trucks
  def index
    is_active = params[:is_active]

    if is_active
      trucks = Truck.where(is_active: is_active).order(:id)
    else
      trucks = Truck.all.order(:id)
    end

    serialized_data = TruckSerializer.new(trucks).serializable_hash[:data]
    response_data = serialized_data.map { |s| s[:attributes] }

    render json: response_data
  end

  # GET /trucks/1
  def show
    render json: @truck
  end

  # POST /trucks
  def create
    @truck = Truck.new(truck_params)

    if @truck.save
      render json: @truck, status: :created
    else
      render json: @truck.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trucks/1
  def update
    if @truck.update(truck_params)
      render json: @truck
    else
      render json: @truck.errors, status: :unprocessable_entity
    end
  end

  # POST /trucks/bulk_update
  def bulk_update
    @trucks = params[:trucks]

    @trucks.each do |truck|
      t = Truck.find(truck[:id])
      t.update(name: truck[:name], is_active: truck[:is_active])
    end
    render json: @trucks, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Truck not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # DELETE /trucks/1
  def destroy
    @truck.destroy!
  end

  private

  def set_truck
    @truck = Truck.find(params.expect(:id))
  end

  def truck_params
    params.expect(truck: %i[name is_active])
  end
end
