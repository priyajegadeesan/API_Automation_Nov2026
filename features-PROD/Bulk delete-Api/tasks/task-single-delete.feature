Feature: Task Single Delete UAT
  As an API consumer
  I want to create and then delete a single task in UAT environment
  So that I can verify task lifecycle management

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @uat @task @create @bulk-delete @smoke
  Scenario: Create a task named Bulk delete-1 in UAT
    When I send a POST request to "/api/v2/actions" with body:
      """
      {
        "action": "create",
        "type": "task",
        "version": "1",
        "category": "scm_migration",
        "settings": {
          "name": "Bulk delete-1",
          "configuration": {
            "migrationType": "GIT_TO_GIT",
            "sourceScmType": "github",
            "sourceGitToolId": "67a5de17fe54ef0012d01e2a",
            "targetScmType": "github",
            "targetGitToolId": "67a5de17fe54ef0012d01e2a"
          }
        }
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
    And I store the created task ID

  @uat @task @delete @bulk-delete @smoke
  Scenario: Delete the task created in Scenario 1
    When I delete the task created in the previous scenario
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
