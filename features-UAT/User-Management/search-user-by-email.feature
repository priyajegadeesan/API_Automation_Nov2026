Feature: Search User by Email
  As an API consumer
  I want to search for users by their email address

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @search @email @uat @get
  Scenario: Search user by email successfully
    When I send a GET request to "/api/v2/usermanagement/user?search=email=qaguest_uat@opsera.us"
    Then the response status code should be 200
    And the response should have property "_id"
    And the response should have property "email"
