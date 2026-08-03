@prod @get-all-values @get
Feature: Get all Registry with s and m
  As an API user
  I want to search for registries with search and m parameters
  So that I can retrieve specific matching registries

  Scenario: Get all Registry with s and m
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=registry&s=docker&m=name"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
