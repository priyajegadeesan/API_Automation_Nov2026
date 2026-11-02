Feature: Pipeline summary
  As an API consumer
  I want to test the Pipeline summary endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @uat
  Scenario: Pipeline summary API call
    When I send a POST request to "/api/v1/pipeline/summary" with body:
      """
      {
        "pipelineId": "6a4e6c738647469b4a18f6b7"
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
