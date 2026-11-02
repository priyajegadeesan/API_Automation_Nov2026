@uat @user-management @get @admin
Feature: Search with Multiple User IDs
  As an API user with admin access
  I want to search for multiple users using their IDs
  So that I can retrieve specific users by their ID list

  Scenario: Search users with multiple IDs
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/usermanagement/users?id=69a7c9e938e63d6398332743,67caf6137242d37590c9f060"
    Then the response status code should be 200
    And the response should be a valid JSON
