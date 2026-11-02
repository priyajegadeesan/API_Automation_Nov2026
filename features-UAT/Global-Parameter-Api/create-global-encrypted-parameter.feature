Feature: Create Global Encrypted Parameter
  As an API consumer
  I want to create a global encrypted parameter
  So that I can store sensitive configuration securely

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @create @UAT-USER @encrypted @UAT-USER @uat
  Scenario: Create encrypted parameter successfully
    # Note: The parameter name must be unique. The step auto-generates a unique name with timestamp.
    When I send a POST request to create global encrypted parameter
    Then the response status code should be 200
    And the response should contain the created parameter
    And the parameter should be marked as encrypted
