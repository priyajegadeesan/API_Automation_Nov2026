Feature: Get Global Parameter nonencrypted Value
  As an API consumer
  I want to retrieve a non-encrypted global parameter value
  So that I can access non-secure parameter values

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @get @UAT-USER @nonencrypted @UAT-USER @value @UAT-USER @uat
  Scenario: Get non-encrypted global parameter value successfully
    When I send a GET request to "/api/v2/global-parameters/6980401698ef6ff3e44d222c/value"
    Then the response status code should be 200
