Feature: Post All Tasks
  As a Tasks API consumer
  I want to post all tasks for a specific pipeline
  So that I can create or retrieve tasks

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @tasks @prod @post
  Scenario: Post all tasks by pipeline ID
    Given I have a valid pipeline ID "66a920e1bf9a9e002f9a36db"
    When I send a POST request to "/api/v2/tasks" with body:
      """
      {
        "pipelineId": "66a920e1bf9a9e002f9a36db"
      }
      """
    Then the response status code should be 200
    And the response should contain tasks data
