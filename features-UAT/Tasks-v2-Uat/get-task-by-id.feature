Feature: Get Task By ID v2 UAT
  As an API consumer
  I want to retrieve a specific task by ID in UAT
  So that I can view detailed task information

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @tasks @get @lookup @uat @post
  Scenario: Get task by ID with lookup
    When I send a POST request to "/api/v2/tasks/lookup" with body:
      """
      {
        "id": "66c487b19533e7001263df7a"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
