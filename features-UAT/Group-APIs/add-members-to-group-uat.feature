Feature: Add Members To Group UAT
  As an API consumer
  I want to add members to a group in UAT environment
  So that I can manage UAT group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @UAT-USER @groups @members @add @UAT-USER @uat @UAT-USER @post
  Scenario: Add members to UAT group successfully
    When I send a POST request to "/api/v2/usermanagement/group/qatest-sup1370-rbac/members" with body:
      """
      [
        "keerthiga@opsera.us",
        "pradeep.marri@opsera.us"
      ]
      """
    Then the response status code should be 200
    And the response should have property "message"