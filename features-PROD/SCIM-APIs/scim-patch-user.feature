Feature: SCIM Patch User
  As a SCIM API consumer
  I want to patch user information using SCIM PatchOp
  So that I can update user attributes and roles

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @scim @users @patch @uat
  Scenario: Patch SCIM user with operations
    When I send a PATCH request to "/api/v2/scim/v2/users/6a998e9f36dbe98a635ab25b" with body:
      """
      {
        "schemas": [
          "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
          {
            "op": "Add",
            "path": "active",
            "value": "True"
          },
          {
            "op": "Add",
            "path": "roles[primary eq \"True\"].value",
            "value": "auditor"
          }
        ]
      }
      """
    Then the response status code should be 200
    And the response should have property "schemas"
    And the response should have property "id"
