@prod @get-all-values @get
Feature: Get all Pipelines with s param
  As an API user
  I want to search for pipelines using a search parameter
  So that I can filter pipelines by name or keyword

  Scenario: Get all Pipelines with s param
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/search?t=pipeline&s=REG_"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
