Feature: GET Task Status
  As a Tasks API consumer
  I want to get the status of a single task
  So that I can check task execution state

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @tasks @prod @status
  Scenario: Get task status by ID
    Given I have a valid task ID "6838419bb017a1f73f62840a"
    When I send a POST request to "/api/v2/tasks/status" with body:
      """
      {
        "id": "6838419bb017a1f73f62840a"
      }
      """
    Then the response status code should be 200
    And the response should contain task status
