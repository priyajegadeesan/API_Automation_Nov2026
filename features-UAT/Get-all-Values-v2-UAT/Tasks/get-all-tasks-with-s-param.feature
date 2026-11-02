@UAT-USER @prod @get-all-values @get
Feature: Get all tasks with s param
  As an API user
  I want to search for tasks using a search parameter
  So that I can filter tasks by name or keyword

  Scenario: Get all tasks with s param
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a GET request to "/api/v2/search?t=task&s=QA_"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
