Feature: GET-Tasks-status
  As an API consumer
  I want to test the GET-Tasks-status endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @prod
  Scenario: GET-Tasks-status API call
    When I send a POST request to "/api/v2/task/status" with body:
      """
      {
        "id": "68b6bbec43e9360c6090fff9"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
