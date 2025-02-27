class Api::V1::RatesController < ApplicationController
  skip_before_action :authenticate, only: %i[index]
  before_action :set_rate, only: %i[show update destroy]

  # GET /rates
  def index
    rates = Rate.all.order(:id)
    serialized_data = RateSerializer.new(rates).serializable_hash[:data]
    response_data = serialized_data.map { |rate| rate[:attributes] }

    render json: response_data
  end

  # GET /rates/1
  def show
    render json: @rate
  end

  # POST /rates
  def create
    @rate = Rate.new(rate_params)

    if @rate.save
      render json: @rate, status: :created
    else
      render json: @rate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rates/bulk_update
  def bulk_update
    @rates = params[:rates]
    @rates.each do |rate|
      r = Rate.find(rate[:id])
      r.update(
        extra_mover_rate: rate[:extra_mover_rate],
        extra_truck_rate: rate[:extra_truck_rate],
        enable: rate[:enable],
        name: rate[:name],
        color: rate[:color],
        movers_rates: rate[:movers_rates]
      )
    end
    render json: @rates, status: :accepted
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Rate not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # PATCH/PUT /rates/1
  def update
    if @rate.update(rate_params)
      render json: @rate
    else
      render json: @rate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rates/1
  def destroy
    @rate.destroy!
  end

  private

  def set_rate
    @rate = Rate.find(params.expect(:id))
  end

  def rate_params
    params.expect(
      rate: %i[extra_mover_rate extra_truck_rate enable name color movers_rates]
    )
  end
end
