Feature: GET-Tasks-status
  As an API consumer
  I want to test the GET-Tasks-status endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: GET-Tasks-status API call
    When I send a POST request to "/api/v2/task/status" with body:
      """
      {
        "id": "6501ff2ce113c60012045cac"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
