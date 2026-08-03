Feature: Get Global Parameter encrypted Value
  As an API consumer
  I want to retrieve an encrypted global parameter value
  So that I can access secure parameter values

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @get @encrypted @value @uat
  Scenario: Get encrypted global parameter value successfully
    When I send a GET request to "/api/v2/global-parameters/698040f298ef6ff3e44d225e/value"
    Then the response status code should be 200
