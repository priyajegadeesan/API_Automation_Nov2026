Feature: SCIM Patch Group
  As a SCIM API consumer
  I want to patch group information using SCIM PatchOp
  So that I can update group members

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @scim @groups @patch @uat
  Scenario: Patch SCIM group with member operations
    When I send a PATCH request to "/api/v2/scim/v2/groups/scim-group-prod" with body:
      """
      {
        "schemas": [
          "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
          {
            "op": "Add",
            "path": "members",
            "value": [
              {
                "value": "653fed9378fd710016a8da10"
              }
            ]
          }
        ]
      }
      """
    Then the response status code should be 200
    And the response should have property "schemas"
    And the response should have property "id"
