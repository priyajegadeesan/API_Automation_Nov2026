Feature: UAT v2 Stop Pipeline
  As an API consumer
  I want to stop a pipeline using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @UAT-USER @stop @UAT-USER @uat
  Scenario: Stop a pipeline in UAT
    When I send a POST request to "/api/v2/actions" with stop action
    Then the response status code should be 200
