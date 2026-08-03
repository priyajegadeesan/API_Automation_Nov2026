Feature: Create a New User
  As an API consumer
  I want to create a new user in the system
  So that I can test user management functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @create @uat
  Scenario: Create a new user successfully
    When I send a POST request to "/api/v2/usermanagement/user" with user details
    Then the response status code should be 200
    And the response should be a valid JSON
