Feature: Pipeline create test
  As an API consumer
  I want to test the Pipeline create test endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: Pipeline create test API call
    When I send a POST request to "/api/v2/pipelines/create" with pipeline creation body
    Then the response status code should be 200
