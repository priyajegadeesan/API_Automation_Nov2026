@prod @user-management @get
Feature: Retrieve all Users
  As an API user
  I want to retrieve all users from the system
  So that I can view the complete user list

  Scenario: Successfully retrieve all users
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/usermanagement/users"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
