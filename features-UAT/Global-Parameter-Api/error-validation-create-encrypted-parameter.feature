Feature: Error validation - Create Global encrypted Parameter
  As an API consumer
  I want to validate error handling when creating encrypted parameters
  So that I can ensure proper validation

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @create @UAT-USER @error @validation @UAT-USER @encrypted @UAT-USER @uat
  Scenario: Create encrypted parameter with missing required fields
    When I send a POST request to "/api/v2/global-parameters/create" with body:
      """
      {
        "value": "encrypted-secret",
        "vaultEnabled": true
      }
      """
    Then the response status code should be 500
