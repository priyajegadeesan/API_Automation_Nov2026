Feature: List Recent Runs with Limit Above Maximum
  As an API consumer
  I want to verify limit is clamped to maximum value of 10

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @runs @list @UAT-USER @uat @UAT-USER @get
  Scenario: List recent runs with limit of 50
    When I send a GET request to "/api/v2/pipelines/6a1410b4e70b93d416d27074/runs?limit=50"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
