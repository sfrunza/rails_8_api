require "test_helper"

class ExtraServicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @extra_service = extra_services(:one)
  end

  test "should get index" do
    get extra_services_url, as: :json
    assert_response :success
  end

  test "should create extra_service" do
    assert_difference("ExtraService.count") do
      post extra_services_url, params: { extra_service: { enabled: @extra_service.enabled, index: @extra_service.index, name: @extra_service.name, price: @extra_service.price } }, as: :json
    end

    assert_response :created
  end

  test "should show extra_service" do
    get extra_service_url(@extra_service), as: :json
    assert_response :success
  end

  test "should update extra_service" do
    patch extra_service_url(@extra_service), params: { extra_service: { enabled: @extra_service.enabled, index: @extra_service.index, name: @extra_service.name, price: @extra_service.price } }, as: :json
    assert_response :success
  end

  test "should destroy extra_service" do
    assert_difference("ExtraService.count", -1) do
      delete extra_service_url(@extra_service), as: :json
    end

    assert_response :no_content
  end
end
