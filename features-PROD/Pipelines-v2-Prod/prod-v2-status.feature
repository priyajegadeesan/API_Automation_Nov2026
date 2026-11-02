Feature: Prod v2 Pipeline Status
  As an API consumer
  I want to check pipeline status using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @status @prod
  Scenario: Get pipeline execution status in production
    When I send a POST request to "/api/v2/actions" with body:
      """
      {
        "action": "status",
        "type": "pipeline",
        "version": "1",
        "target": ["5f8de2932e1d80681c4024fc"]
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
