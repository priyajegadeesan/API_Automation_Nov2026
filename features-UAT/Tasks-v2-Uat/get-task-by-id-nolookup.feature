Feature: Get Task By ID No Lookup
  As a Tasks API consumer
  I want to retrieve task by ID without lookup
  So that I can get basic task information

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @tasks @prod @nolookup
  Scenario: Get task by ID without lookup
    Given I have a valid task ID "6838419bb017a1f73f62840a"
    When I send a POST request to "/api/v2/tasks" with body:
      """
      {
        "id": "6838419bb017a1f73f62840a"
      }
      """
    Then the response status code should be 200
    And the response should contain task details without lookup data
