Feature: Get TaskByName
  As an API consumer
  I want to test the Get TaskByName endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @uat
  Scenario: Get TaskByName API call
    When I send a POST request to "/api/v2/tasks/lookup" with body:
      """
      {
        "name": "24191_AWS ARN"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
