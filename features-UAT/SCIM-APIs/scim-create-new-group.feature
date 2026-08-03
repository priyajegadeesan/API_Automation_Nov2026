Feature: SCIM Create New Group
  As a SCIM API consumer
  I want to create new groups using SCIM protocol
  So that I can manage group provisioning

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @smoke @scim @groups @create @uat @post
  Scenario: Create new SCIM group successfully
    When I send a POST request to "/api/v2/scim/v2/groups" with body:
      """
      {
        "schemas": [
          "urn:ietf:params:scim:schemas:core:2.0:Group"
        ],
        "displayName": "grp${timestamp}",
        "members": [
          {
            "value": "653b5e3d8853ab001653e529"
          },
          {
            "value": "6603aeedf52a68002d3cffb7"
          }
        ]
      }
      """
    Then the response status code should be 201
    And the response should have property "schemas"
    And the response should have property "id"
