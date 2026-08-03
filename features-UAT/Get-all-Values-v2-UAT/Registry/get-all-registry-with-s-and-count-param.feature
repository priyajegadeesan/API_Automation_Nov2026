@prod @get-all-values @get
Feature: Get all registry with s and count param
  As an API user
  I want to search for registries with a specific count limit
  So that I can control the number of results returned

  Scenario: Get all registry with s and count param
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=registry&s=QA_&count=2"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
