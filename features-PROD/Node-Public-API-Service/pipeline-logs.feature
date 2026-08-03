Feature: Pipeline logs
  As an API consumer
  I want to test the Pipeline logs endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @prod
  Scenario: Pipeline logs API call
    When I send a POST request to "/api/v1/pipeline/logs" with body:
      """
      {
        "pipelineId": "6a2be3506a71394f1ff0b305",
        "runCount": 1,
        "type": "console output"
      }
      """
    Then the response status code should be 200
    And the response should have property "_id"
    And the response should have property "pipeline_id"
