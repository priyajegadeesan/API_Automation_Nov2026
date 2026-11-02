@UAT-USER @prod @get-all-values @get
Feature: Get all Pipelines with s and m
  As an API user
  I want to search for pipelines with search and m parameters
  So that I can retrieve specific matching pipelines

  Scenario: Get all Pipelines with s and m
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a GET request to "/api/v2/search?t=pipeline&s=REG_&m=name"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
