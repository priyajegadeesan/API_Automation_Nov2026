Feature: Update Global nonencrypted Parameter
  As an API consumer
  I want to update a non-encrypted global parameter
  So that I can modify parameter values

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @update @nonencrypted @uat @post
  Scenario: Update non-encrypted parameter successfully
    When I send a POST request to "/api/v2/global-parameters/61fb78de8a74ad0012e5e554/update" with body:
      """
      {
        "value": "updated-parameter-value-3"
      }
      """
    Then the response status code should be 200
    And the response should have property "data"
