Feature: GetList of Param
  As an API consumer
  I want to test the GetList of Param endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get @uat
  Scenario: GetList of Param API call
    When I send a GET request to "/api/v2/parameters/pipeline/69405bd5bfbd137b05d35bed"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
