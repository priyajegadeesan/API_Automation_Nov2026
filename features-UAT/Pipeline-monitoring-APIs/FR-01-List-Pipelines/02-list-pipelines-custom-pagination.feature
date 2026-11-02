Feature: List Pipelines with Custom Pagination
  As an API consumer
  I want to list pipelines with custom pagination in PROD environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @list @UAT-USER @pagination @UAT-USER @prod
  Scenario: List pipelines with custom pagination parameters
    When I send a GET request to "/api/v2/pipelines" with custom pagination
    Then the response status code should be 200
