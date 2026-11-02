Feature: UAT v2 Delete Pipeline
  As an API consumer
  I want to delete a pipeline using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @UAT-USER @delete @UAT-USER @uat
  Scenario: Delete an existing pipeline in UAT
    When I send a POST request to "/api/v2/actions" with delete action
    Then the response status code should be 200
