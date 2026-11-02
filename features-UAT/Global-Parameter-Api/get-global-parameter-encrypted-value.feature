Feature: Get Global Parameter encrypted Value
  As an API consumer
  I want to retrieve an encrypted global parameter value
  So that I can access secure parameter values

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @UAT-USER @smoke @parameters @get @UAT-USER @encrypted @UAT-USER @value @UAT-USER @uat
  Scenario: Get encrypted global parameter value successfully
    When I send a GET request to "/api/v2/global-parameters/61fb78de8a74ad0012e5e554/value"
    Then the response status code should be 200
    And the response body should contain "data"
    
  @UAT-USER @security @rbac @parameters @encrypted @negative @uat
  Scenario: RBAC user should not access encrypted parameter without proper permissions
    Given I have a valid encrypted parameter ID for restricted access
    When I send a GET request to "/api/v2/global-parameters/61fb78de8a74ad0012e5e554/value"
    Then the response should indicate proper authorization check
