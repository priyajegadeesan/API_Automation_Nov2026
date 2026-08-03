Feature: Get Run Status for Non-existent Pipeline
  As an API consumer
  I want to verify error handling for non-existent pipeline with valid ObjectId format

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @negative @prod
  Scenario: Get run status for non-existent pipeline with valid ObjectId
    When I send a GET request to "/api/v2/pipelines/507f1f77bcf86cd799439011/runs/1/status"
    Then the response status code should be 404
