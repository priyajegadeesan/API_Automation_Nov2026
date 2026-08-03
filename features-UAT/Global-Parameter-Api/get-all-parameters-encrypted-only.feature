Feature: Get All Parameters (encrypted only)
  As an API consumer
  I want to retrieve only encrypted global parameters
  So that I can view secure parameters

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @get @encrypted @uat
  Scenario: Get all encrypted parameters successfully
    When I send a GET request to "/api/v2/global-parameters/?encrypted=true"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
