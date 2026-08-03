Feature: Add Members To Group PROD
  As an API consumer
  I want to add members to a group in PROD environment
  So that I can manage production group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @members @add @prod @post
  Scenario: Add members to PROD group successfully
    When I send a POST request to "/api/v2/usermanagement/group/qa-team-jan24/members" with body:
      """
      [
        "priya3110@protonmail.com",
        "qaprod@protonmail.com"
      ]
      """
    Then the response status code should be 200
    And the response should have property "message"