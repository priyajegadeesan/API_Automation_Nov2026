Feature: Pipeline demo
  As an API consumer
  I want to test the Pipeline demo endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @prod
  Scenario: Pipeline demo API call
    When I send a POST request to "/api/v1/pipeline/demo" with body:
      """
      {
        "pipelineId": "6a36ab16d167846a79433149"
      }
      """
    Then the response status code should be 200
