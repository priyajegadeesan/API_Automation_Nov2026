Feature: GetList of Param
  As an API consumer
  I want to test the GetList of Param endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get @prod
  Scenario: GetList of Param API call
    When I send a GET request to "/api/v2/parameters/pipeline/6a314b9c7341af4f440688a2"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
