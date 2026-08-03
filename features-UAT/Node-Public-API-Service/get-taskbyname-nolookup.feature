Feature: Get TaskByName-Nolookup
  As an API consumer
  I want to test the Get TaskByName-Nolookup endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: Get TaskByName-Nolookup API call
    When I send a POST request to "/api/v2/task" with body:
      """
      {
        "name": "24191_AWS ARN"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
