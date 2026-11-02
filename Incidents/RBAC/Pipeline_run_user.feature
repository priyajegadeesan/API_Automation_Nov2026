Feature: RBAC - Pipeline Run with User Token
  As a consumer with user-level permissions
  I want to verify that I can run a pipeline with my user token
  So that I can confirm proper RBAC permissions are configured

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @rbac @pipeline @run @uat
  Scenario: User with valid token can run a pipeline
    When I send a POST request to "/api/v2/actions" with run action
    Then the response status code should be 200
    And the response should be a valid JSON
