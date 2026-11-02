Feature: Update a Person
  As an API consumer
  I want to update a person's information in the system

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @people @UAT-USER @update @UAT-USER @uat
  Scenario: Update a person successfully
    When I send a POST request to "/api/v2/data/people" with body:
      """
      {
        "email": "Testingpeoplecreate12@protonmail.com",
        "firstName": "People",
        "lastName": "API",
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
