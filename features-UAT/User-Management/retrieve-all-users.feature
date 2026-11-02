@uat @user-management @get @admin
Feature: Retrieve all Users
  As an API user with admin access
  I want to retrieve all users from the system
  So that I can view the complete user list
  
  # Note: This endpoint takes 55+ seconds to respond and requires admin permissions

  Scenario: Successfully retrieve all users
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/usermanagement/users" with extended timeout
    Then the response status code should be 200
    And the response should be a valid JSON
