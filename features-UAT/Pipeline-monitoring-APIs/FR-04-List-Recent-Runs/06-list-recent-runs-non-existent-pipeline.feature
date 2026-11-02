Feature: List Recent Runs for Non-existent Pipeline
  As an API consumer
  I want to verify error handling for non-existent pipeline

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @runs @list @UAT-USER @negative @UAT-USER @prod @UAT-USER @get
  Scenario: List recent runs for non-existent pipeline
    When I send a GET request to "/api/v2/pipelines/000000000000000000000000/runs"
    Then the response status code should be 400
    And the response should have property "status"
    And the response should have property "metadata"
