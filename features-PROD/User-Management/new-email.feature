@prod @user-management @get
Feature: Search User by New Email
  As an API user
  I want to search for a user using their email address
  So that I can retrieve user details by email

  Scenario: Successfully search for user by email address
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/usermanagement/user?search=email=qauser_prod@protonmail.com"
    Then the response status code should be 200
    And the response should be a valid JSON
