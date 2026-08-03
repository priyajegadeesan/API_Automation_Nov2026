Feature: Registry Summary
  As an API consumer
  I want to test the Registry Summary endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: Registry Summary API call
    When I send a POST request to "/api/v1/registry/summary" with body:
      """
      {
        "toolId": "67b8b01c15f69d0013efd7fa"
      }
      """
    Then the response status code should be 200
    And the response should have property "_id"
    And the response should have property "name"
    And the response should have property "description"
