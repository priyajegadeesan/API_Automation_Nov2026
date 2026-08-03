@prod @get-all-values @get
Feature: Pipeline search with id
  As an API user
  I want to search for a pipeline using its ID
  So that I can retrieve specific pipeline details

  Scenario: Pipeline search with id
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=pipeline&s=62fe32fc37a2960019b5e754"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
