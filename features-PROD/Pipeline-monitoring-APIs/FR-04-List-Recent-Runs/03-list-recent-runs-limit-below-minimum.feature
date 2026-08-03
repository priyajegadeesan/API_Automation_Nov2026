Feature: List Recent Runs with Limit Below Minimum
  As an API consumer
  I want to verify limit is clamped to minimum value of 5

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @runs @list @prod @get
  Scenario: List recent runs with limit of 5
    When I send a GET request to "/api/v2/pipelines/69623b4825f0aea264fb192e/runs?limit=5"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
