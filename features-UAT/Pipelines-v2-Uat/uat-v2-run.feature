Feature: UAT v2 Run Pipeline
  As an API consumer
  I want to run a pipeline using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @UAT-USER @run @UAT-USER @uat
  Scenario: Run a pipeline in UAT
    When I send a POST request to "/api/v2/actions" with run action
    Then the response status code should be 200
