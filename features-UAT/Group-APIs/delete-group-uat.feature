Feature: Delete Group UAT
  As an API consumer
  I want to delete a group in UAT environment
  So that I can remove groups that are no longer needed

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @delete @uat
  Scenario: Create and delete a group successfully
    # First create a group to delete
    When I send a POST request to "/api/v2/usermanagement/group" with body:
      """
      {
        "groupName": "priya-uat-9thjuly",
        "groupMemberUserIds": []
      }
      """
    Then the response status code should be 200
    And I store the created group name
    # Now delete the created group
    When I send a DELETE request to the group deletion endpoint
    Then the response status code should be 200
    And the response should have property "message"