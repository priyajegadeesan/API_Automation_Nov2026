Feature: Registry Update
  As an API consumer
  I want to test the Registry Update endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @prod
  Scenario: Registry Update API call
    When I send a POST request to "/api/v1/registry/update" with body:
      """
      {
        "toolId": "6a2d68afb8c82cc09e455b55",
        "tool": {
          "description": "Updating the description here through customer API.  Fingers crossed"
        }
      }
      """
    Then the response status code should be 200
    And the response should have property "testConnection"
