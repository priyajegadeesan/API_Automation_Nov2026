Feature: Get Pipeline Details with Invalid ID Format
  As an API consumer
  I want to verify proper error handling for invalid ID format

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @details @negative @uat
  Scenario: Get pipeline details with invalid ID format
    When I send a GET request to "/api/v2/pipelines/{pipelineId}" with invalid ID format
    Then the response status code should be 400
