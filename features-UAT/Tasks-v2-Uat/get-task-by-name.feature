Feature: Get Task By Name
  As a Tasks API consumer
  I want to retrieve task by name with lookup
  So that I can get complete task information

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @tasks @UAT-USER @prod @UAT-USER @lookup
  Scenario: Get task by name with lookup
    Given I have a valid task name "24191_AWS ARN"
    When I send a POST request to "/api/v2/tasks/lookup" with body:
      """
      {
        "name": "24191_AWS ARN"
      }
      """
    Then the response status code should be 200
    And the response should contain task details with lookup data
