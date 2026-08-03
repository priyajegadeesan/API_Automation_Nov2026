@prod @get-all-values @get
Feature: Get all registry with s param
  As an API user
  I want to search for registries using a search parameter
  So that I can filter registries by name or keyword

  Scenario: Get all registry with s param
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=registry&s=docker"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
