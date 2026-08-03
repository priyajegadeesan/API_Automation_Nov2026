@prod @get-all-values @get
Feature: Get all registry without count (100 results)
  As an API user
  I want to get all registries without specifying a count
  So that I can retrieve the default 100 results

  Scenario: Get all registry without count (100 results)
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=registry"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
