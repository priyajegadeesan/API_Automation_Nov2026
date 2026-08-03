Feature: Prod v2 Pipeline Status
  As an API consumer
  I want to check pipeline status using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @status @prod
  Scenario: Get pipeline execution status in production
    When I send a GET request to "/api/v2/pipelines/status" with pipeline ID
    Then the response status code should be 200
