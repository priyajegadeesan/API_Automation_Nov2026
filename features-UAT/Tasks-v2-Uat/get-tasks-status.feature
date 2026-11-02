Feature: GET Tasks Status
  As a Tasks API consumer
  I want to get the status of tasks
  So that I can monitor task execution

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @tasks @uat @UAT-USER @status @UAT-USER @post
  Scenario: Get tasks status by ID
    Given I have a valid task ID "66c487b19533e7001263df7a"
    When I send a POST request to "/api/v2/tasks/status" with body:
      """
      {
        "id": "66c487b19533e7001263df7a"
      }
      """
    Then the response status code should be 200
