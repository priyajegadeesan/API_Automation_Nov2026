Feature: UAT v2 Update Pipeline
  As an API consumer
  I want to update a pipeline using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @UAT-USER @update @UAT-USER @uat
  Scenario: Update an existing pipeline in UAT
    When I send a POST request to "/api/v2/actions" with update action
    Then the response status code should be 200
