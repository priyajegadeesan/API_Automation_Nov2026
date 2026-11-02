Feature: Patch Members To Group UAT
  As an API consumer
  I want to patch/update group members in UAT
  So that I can modify group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @UAT-USER @groups @members @UAT-USER @patch @UAT-USER @uat
  Scenario: Patch group members successfully
    When I send a PATCH request to "/api/v2/usermanagement/group/qatest-sup1370-rbac/members" with body:
      """
      [
        "qauser_uat@opsera.us",
        "qasecuritymanager_uat@opsera.us"
      ]
      """
    Then the response status code should be 200
    And the response should have property "message"