@UAT-USER @prod @get-all-values @get
Feature: Get all Pipelines with s and regex
  As an API user
  I want to search for pipelines using search and regex parameters
  So that I can perform advanced pattern matching

  Scenario: Get all Pipelines with s and regex
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a GET request to "/api/v2/search?t=pipeline&s=REG_&regex=true"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
