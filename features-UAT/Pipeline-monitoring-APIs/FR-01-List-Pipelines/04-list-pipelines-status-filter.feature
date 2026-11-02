Feature: List Pipelines with Status Filter
  As an API consumer
  I want to list pipelines with status filter in PROD environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @list @UAT-USER @filter @UAT-USER @prod
  Scenario: List pipelines filtered by status
    When I send a GET request to "/api/v2/pipelines" with status filter
    Then the response status code should be 200
