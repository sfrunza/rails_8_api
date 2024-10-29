class Api::V1::CalendarRatesController < ApplicationController
  skip_before_action :authenticate, only: %i[index]
  before_action :set_calendar_rate, only: %i[update destroy]

  # GET /calendar_rates
  def index
    @calendar_rates =
      CalendarRate
        .includes(:rate)
        .where(
          date: Date.today.beginning_of_month..11.months.from_now.end_of_month
        )
        .order(:date)

    @calendar_rates_hash =
      @calendar_rates.each_with_object({}) do |calendar_rate, hash|
        hash[
          calendar_rate.date.strftime("%m-%d-%Y")
        ] = calendar_rate.attributes.merge(rate: calendar_rate.rate)
      end

    render json: @calendar_rates_hash.to_json
  end

  # GET /calendar_rates/1
  # def show
  #   render json: @calendar_rate
  # end

  # POST /calendar_rates
  def create
    @calendar_rate = CalendarRate.new(calendar_rate_params)

    if @calendar_rate.save
      render json: @calendar_rate, status: :created
    else
      render json: @calendar_rate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /calendar_rates/1
  def update
    if @calendar_rate.update(calendar_rate_params)
      render json: @calendar_rate
    else
      render json: @calendar_rate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /calendar_rates/1
  def destroy
    @calendar_rate.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_calendar_rate
    @calendar_rate = CalendarRate.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def calendar_rate_params
    params.expect(
      calendar_rate: %i[
        date
        enable_automation
        enable_auto_booking
        is_blocked
        rate_id
      ]
    )
  end
end
