Feature: Registry Update
  As an API consumer
  I want to test the Registry Update endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @uat
  Scenario: Registry Update API call
    When I send a POST request to "/api/v1/registry/update" with body:
      """
      {
        "toolId": "67b8b01c15f69d0013efd7fa",
        "tool": {
          "description": "Updating the description here through customer API.  Fingers crossed"
        }
      }
      """
    Then the response status code should be 200
    And the response should have property "testConnection"
