Feature: Get Global Parameter Value with no validation
  As an API consumer
  I want to retrieve a global parameter value without validation
  So that I can access parameter values directly

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @get @value @uat
  Scenario: Get global parameter value without validation
    When I send a GET request to "/api/v2/global-parameters/681dde963074f316ddacdfc9/value"
    Then the response status code should be 200
