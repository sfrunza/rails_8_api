require "test_helper"

class MovingServicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @moving_service = moving_services(:one)
  end

  test "should get index" do
    get moving_services_url, as: :json
    assert_response :success
  end

  test "should create moving_service" do
    assert_difference("MovingService.count") do
      post moving_services_url, params: { moving_service: { enabled: @moving_service.enabled, index: @moving_service.index, miles_setting: @moving_service.miles_setting, name: @moving_service.name } }, as: :json
    end

    assert_response :created
  end

  test "should show moving_service" do
    get moving_service_url(@moving_service), as: :json
    assert_response :success
  end

  test "should update moving_service" do
    patch moving_service_url(@moving_service), params: { moving_service: { enabled: @moving_service.enabled, index: @moving_service.index, miles_setting: @moving_service.miles_setting, name: @moving_service.name } }, as: :json
    assert_response :success
  end

  test "should destroy moving_service" do
    assert_difference("MovingService.count", -1) do
      delete moving_service_url(@moving_service), as: :json
    end

    assert_response :no_content
  end
end
