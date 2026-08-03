Feature: Pipeline summary
  As an API consumer
  I want to test the Pipeline summary endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @prod
  Scenario: Pipeline summary API call
    When I send a POST request to "/api/v1/pipeline/summary" with body:
      """
      {
        "pipelineId": "6a2d85ed3d93cb23a3372509"
      }
      """
    Then the response status code should be 200
    And the response should have property "_id"
    And the response should have property "name"
    And the response should have property "description"
