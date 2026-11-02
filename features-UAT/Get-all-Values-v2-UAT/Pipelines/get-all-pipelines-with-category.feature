@UAT-USER @prod @get-all-values @get
Feature: Get all Pipelines with category
  As an API user
  I want to search for pipelines by category
  So that I can retrieve pipelines of a specific type

  Scenario: Get all Pipelines with category
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a GET request to "/api/v2/search?t=pipeline&c=oracle_fusion"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
