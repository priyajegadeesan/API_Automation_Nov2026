@prod @get-all-values @get
Feature: Get all registry with max count
  As an API user
  I want to retrieve registries with maximum count limit
  So that I can get the largest possible result set

  Scenario: Get all registry with max count
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=registry&count=5000"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
