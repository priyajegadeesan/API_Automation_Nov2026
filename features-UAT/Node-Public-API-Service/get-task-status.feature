Feature: GET-Task-status
  As an API consumer
  I want to test the GET-Task-status endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @uat
  Scenario: GET-Task-status API call
    When I send a POST request to "/api/v2/tasks/status" with body:
      """
      {
        "id": "6501ff2ce113c60012045cac"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
