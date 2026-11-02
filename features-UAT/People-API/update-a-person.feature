Feature: Update A Person
  As an API consumer
  I want to update person information
  So that I can modify person records

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @people @update @UAT-USER @prod @UAT-USER @put
  Scenario: Update person successfully
    When I send a PUT request to "/api/v2/data/people/Testingpeoplecreate1@protonmail.com" with body:
      """
      {
        "email": "Testingpeoplecreate1@protonmail.com",
        "firstName": "Updated",
        "lastName": "API",
        "organization": "protonmail.com",
        "business": "Engineering",
        "department": "Platform",
        "group": "qateam",
        "team": "AOD"
      }
      """
    Then the response status code should be 200