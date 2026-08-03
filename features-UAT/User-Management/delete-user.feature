Feature: Delete User
  As an API consumer
  I want to create and then delete a user from the system
  So that I can test user lifecycle without affecting existing users

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @delete @uat @cleanup
  Scenario: Create a user and then delete it
    # First create the user
    When I send a POST request to "/api/v2/usermanagement/user" with user details
    Then the response status code should be 200
    And the response should be a valid JSON
    
    # Now delete the same user using the stored ID
    When I send a DELETE request to delete the created user
    Then the response status code should be 200
    And the response should be a valid JSON
