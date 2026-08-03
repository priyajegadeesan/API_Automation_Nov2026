Feature: List Recent Runs with Default Limit
  As an API consumer
  I want to list recent runs with default limit for a pipeline

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @runs @list @uat @get
  Scenario: List recent runs with default limit
    When I send a GET request to "/api/v2/pipelines/6a1410b4e70b93d416d27074/runs"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
