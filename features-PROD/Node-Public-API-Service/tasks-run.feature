@ignore
Feature: Tasks run
  As an API consumer
  I want to test the Tasks run endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @prod
  Scenario: Tasks run API call
    When I send a POST request to "/api/v1/pipeline/run" with body:
      """
      {
        "pipelineId": "6a3e2a0cf23ff06933c11939"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "message"
    And the response should have property "runCount"
