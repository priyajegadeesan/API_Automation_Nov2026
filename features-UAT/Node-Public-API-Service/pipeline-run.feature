Feature: Pipeline run
  As an API consumer
  I want to test the Pipeline run endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: Pipeline run API call
    When I send a POST request to "/api/v1/pipeline/run" with body:
      """
      {
        "pipelineId": "6a36ab16d167846a79433149"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "message"
    And the response should have property "runCount"
