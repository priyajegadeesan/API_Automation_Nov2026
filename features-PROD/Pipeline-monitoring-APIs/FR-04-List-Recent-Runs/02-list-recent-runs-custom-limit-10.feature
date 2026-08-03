Feature: List Recent Runs with Custom Limit 10
  As an API consumer
  I want to list recent runs with custom limit of 10

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @runs @list @prod @get
  Scenario: List recent runs with custom limit of 10
    When I send a GET request to "/api/v2/pipelines/69623b4825f0aea264fb192e/runs?limit=10"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
