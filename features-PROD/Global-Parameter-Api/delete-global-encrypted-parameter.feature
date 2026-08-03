Feature: Delete Global Encrypted Parameter
  As an API consumer
  I want to delete a global encrypted parameter
  So that I can remove sensitive parameters

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @parameters @delete @encrypted @uat
  Scenario: Delete encrypted parameter successfully
    When I send a DELETE request to "/api/v2/global-parameters/698040f298ef6ff3e44d225e"
    Then the response status code should be 200
    And the response should have property "message"
