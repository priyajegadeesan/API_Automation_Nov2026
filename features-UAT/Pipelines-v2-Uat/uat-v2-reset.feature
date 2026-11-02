Feature: UAT v2 Reset Pipeline
  As an API consumer
  I want to reset a pipeline using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @UAT-USER @reset @UAT-USER @uat
  Scenario: Reset a pipeline in UAT
    When I send a POST request to "/api/v2/actions" with reset action
    Then the response status code should be 200
