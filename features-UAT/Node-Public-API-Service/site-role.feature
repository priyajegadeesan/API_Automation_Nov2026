@uat @user-management @patch @site-role
Feature: Site Role
  As an API consumer
  I want to update user site roles
  So that I can manage user permissions

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api
  Scenario: Update user site role to administrator
    When I send a PATCH request to "/api/v2/usermanagement/user/site-role" with body:
      """
      {
        "userId": "qauser_uat@opsera.us",
        "siteRole": "administrator"
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
