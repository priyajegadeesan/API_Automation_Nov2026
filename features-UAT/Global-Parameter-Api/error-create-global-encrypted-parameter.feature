Feature: Error - Create Global encrypted Parameter
  As an API consumer
  I want to handle errors when creating encrypted parameters
  So that I can manage error scenarios

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @create @UAT-USER @error @UAT-USER @encrypted @UAT-USER @uat
  Scenario: Create encrypted parameter with invalid data
    When I send a POST request to "/api/v2/global-parameters/create" with body:
      """
      {
        "name": "",
        "value": "encrypted-secret",
        "vaultEnabled": true
      }
      """
    Then the response status code should be 500
