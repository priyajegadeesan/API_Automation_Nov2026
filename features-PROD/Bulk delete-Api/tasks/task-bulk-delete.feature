Feature: Task Bulk Delete UAT
  As an API consumer
  I want to create multiple tasks and bulk delete them in UAT environment
  So that I can efficiently remove multiple tasks at once

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @uat @task @create @bulk-delete @smoke
  Scenario: Create 10 tasks consecutively named Bulk delete-1 to Bulk delete-10
    When I create 10 tasks with base name "Bulk delete"
    Then 10 task IDs should be stored for bulk deletion

  @uat @task @delete @bulk-delete @smoke
  Scenario: Bulk delete all 10 tasks created in the previous scenario
    When I bulk delete all tasks created in previous scenarios
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
