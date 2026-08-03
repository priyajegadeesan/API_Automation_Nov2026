Feature: Get Task By Name No Lookup
  As a Tasks API consumer
  I want to retrieve task by name without lookup
  So that I can get basic task information

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @tasks @prod @nolookup
  Scenario: Get task by name without lookup
    Given I have a valid task name "24191_AWS ARN"
    When I send a POST request to "/api/v2/tasks" with body:
      """
      {
        "name": "24191_AWS ARN"
      }
      """
    Then the response status code should be 200
    And the response should contain task details without lookup data
