@prod @get-all-values @get
Feature: Get all Tasks with s and regex
  As an API user
  I want to search for tasks using search and regex parameters
  So that I can perform advanced pattern matching

  Scenario: Get all Tasks with s and regex
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=task&s=QA_&regex=true"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
