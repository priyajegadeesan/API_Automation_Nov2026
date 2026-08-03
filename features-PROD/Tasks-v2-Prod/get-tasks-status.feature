Feature: GET Tasks Status
  As a Tasks API consumer
  I want to get the status of tasks
  So that I can monitor task execution

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @tasks @prod @status @post
  Scenario: Get tasks status by ID
    Given I have a valid task ID "6a3678e58ca599aaa7e0ba02"
    When I send a POST request to "/api/v2/tasks/status" with body:
      """
      {
        "id": "6a3678e58ca599aaa7e0ba02"
      }
      """
    Then the response status code should be 200
