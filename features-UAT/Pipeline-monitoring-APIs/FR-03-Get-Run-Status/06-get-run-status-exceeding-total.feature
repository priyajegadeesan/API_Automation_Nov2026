Feature: Get Run Status with Run Count Exceeding Total
  As an API consumer
  I want to verify error handling when run count exceeds total runs

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @negative @prod
  Scenario: Get run status with runCount exceeding total runs
    When I send a GET request to "/api/v2/pipelines/{pipelineId}/runs/999/status"
    Then the response status code should be 404
