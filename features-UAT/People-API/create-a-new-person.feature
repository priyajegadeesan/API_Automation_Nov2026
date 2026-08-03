Feature: Create A New Person
  As an API consumer
  I want to create a new person record
  So that I can add people to the system

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @people @create @uat
  Scenario: Create a new person successfully
    When I send a POST request to "/api/v2/data/people" with body:
      """
      {
        "email": "testperson-${timestamp}@protonmail.com",
        "firstName": "Test",
        "lastName": "Person",
        "organization": "protonmail.com",
        "business": "Engineering",
        "department": "Platform",
        "group": "qateam",
        "team": "AOD"
      }
      """
    Then the response status code should be 200
    And the response should have property "_id"
    And the response should have property "email"
    And the response should have property "firstName"