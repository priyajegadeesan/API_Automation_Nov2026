Feature: SCIM Update User
  As a SCIM API consumer
  I want to update existing SCIM users
  So that I can modify user attributes

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @UAT-USER @scim @users @update @UAT-USER @uat @UAT-USER @patch
  Scenario: Update SCIM user successfully
    When I send a PATCH request to "/api/v2/scim/v2/users/681dfba1b3474278d2a96d61" with body:
      """
      {
        "schemas": [
          "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
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
