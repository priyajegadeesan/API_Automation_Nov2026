Feature: Pipeline v2 search-Prod
  As an API consumer
  I want to test the Pipeline v2 search-Prod endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get @prod
  Scenario: Pipeline v2 search-Prod API call
    When I send a GET request to "/api/v2/search?t=pipeline&s=REG_Lineaje patch&m=name"
    Then the response status code should be 200
    And the response should have property "ids"
    And the response should have property "items"
    And the response should have property "count"
