@prod @get-all-values @get
Feature: Get all Pipelines with s and field
  As an API user
  I want to search for pipelines with search and field parameters
  So that I can filter by specific fields

  Scenario: Get all Pipelines with s and field
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=pipeline&s=REG_&field=name"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
