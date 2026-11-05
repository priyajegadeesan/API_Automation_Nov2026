Feature: RBAC - Pipeline Run Permission Validation
  As a QA user with limited permissions
  I want to verify that I CANNOT run a pipeline without admin rights
  So that I can confirm proper RBAC permissions are enforced

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @rbac @pipeline @run @uat @negative
  Scenario: QA User without admin permission CANNOT run a pipeline
    When I send a POST request to "/api/v2/actions" with run action
    Then the response status code should be 200
    And the response should contain "status" as "failed"
    And the response should contain permission validation error message
