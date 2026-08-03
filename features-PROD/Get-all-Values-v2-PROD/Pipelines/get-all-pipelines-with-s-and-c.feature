@prod @get-all-values @get
Feature: Get all Pipelines with s and c
  As an API user
  I want to search for pipelines with search and c parameters
  So that I can retrieve matching pipelines with custom parameters

  Scenario: Get all Pipelines with s and c
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=pipeline&s=REG_&c=sdlc"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
