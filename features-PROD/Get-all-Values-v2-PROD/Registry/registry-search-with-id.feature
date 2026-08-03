@prod @get-all-values @get
Feature: Registry search with id
  As an API user
  I want to search for a registry using its ID
  So that I can retrieve specific registry details

  Scenario: Registry search with id
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=registry&s=661851a8f9a8c00016676bb5"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
