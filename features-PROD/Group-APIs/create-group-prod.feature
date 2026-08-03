Feature: Create Group Prod
  As an API consumer
  I want to create a new group in PROD environment
  So that I can manage production user groups

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @groups @create @prod @post
  Scenario: Create a new group successfully in PROD
    When I send a POST request to "/api/v2/usermanagement/group" with body:
      """
      {
        "groupName": "qa-team-${timestamp}",
        "groupMemberUserIds": [
          "5f75953446564c10379902bb",
          "6809c97680954466e05d0426"
        ]
      }
      """
    Then the response status code should be 200
    And the response should have property "message"