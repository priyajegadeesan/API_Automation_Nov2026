@ignore
Feature: Run Task API
  As an API consumer
  I want to test the Run Task API endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @uat
  Scenario: Run Task API API call
    When I send a POST request to "/v1/pipeline/run" with body:
      """
      {
        "pipelineId": "6a1410b4e70b93d416d27074"
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
