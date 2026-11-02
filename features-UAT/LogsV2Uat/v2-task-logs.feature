@uat @logs-v2 @post
Feature: v2 Task Logs
  As an API user
  I want to retrieve task logs by task ID
  So that I can view detailed logs for a specific task

  Scenario: Successfully retrieve task logs with task ID
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a POST request to "/api/v2/logs/task" with body:
      """
      {
        "id": "6838419bb017a1f73f62840a"
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
