Feature: List Pipelines with Default Pagination
  As an API consumer
  I want to list pipelines with default pagination in PROD environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @list @UAT-USER @pagination @UAT-USER @prod
  Scenario: List pipelines with default pagination
    When I send a GET request to "/api/v2/pipelines"
    Then the response status code should be 200
