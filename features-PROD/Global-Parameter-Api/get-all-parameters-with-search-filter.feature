Feature: Get All Parameters (with search filter)
  As an API consumer
  I want to retrieve all global parameters with search filters
  So that I can find specific parameters

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @get @search @uat
  Scenario: Get all parameters with search filter successfully
    When I send a GET request to "/api/v2/global-parameters/?search=test"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
