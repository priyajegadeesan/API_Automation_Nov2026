Feature: Update Global encrypted Parameter
  As an API consumer
  I want to update an encrypted global parameter
  So that I can modify secure parameter values

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @update @UAT-USER @encrypted @UAT-USER @uat @UAT-USER @post
  Scenario: Update encrypted parameter successfully
    When I send a POST request to "/api/v2/global-parameters/61fb78de8a74ad0012e5e554/update" with body:
      """
      {
        "value": "encrypted-secret-createdvia node public"
      }
      """
    Then the response status code should be 200
    And the response should have property "data"
