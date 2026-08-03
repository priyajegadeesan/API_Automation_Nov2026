Feature: Data
  As an API consumer
  I want to test the Data endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @options @prod
  Scenario: Data API call
    When I send an OPTIONS request to "/api/v2/data/*"
    Then the response status code should be 204
