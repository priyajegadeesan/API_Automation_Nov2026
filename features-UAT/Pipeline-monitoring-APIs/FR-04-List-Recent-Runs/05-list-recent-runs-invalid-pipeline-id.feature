Feature: List Recent Runs with Invalid Pipeline ID
  As an API consumer
  I want to verify error handling for invalid pipeline ID

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @runs @list @UAT-USER @negative @UAT-USER @prod
  Scenario: List recent runs with invalid pipeline ID
    When I send a GET request to "/api/v2/pipelines/invalid-id/runs/recent"
    Then the response status code should be 400
