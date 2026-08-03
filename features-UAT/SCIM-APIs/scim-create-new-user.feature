Feature: SCIM Create New User
  As a SCIM API consumer
  I want to create a new user using SCIM protocol
  So that I can provision users via SCIM standard

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @smoke @scim @users @create @uat @post
  Scenario: Create new SCIM user successfully
    When I send a POST request to "/api/v2/scim/v2/users" with body:
      """
      {
        "schemas": [
          "urn:ietf:params:scim:schemas:core:2.0:User"
        ],
        "userName": "scimmewarch06@opsera.us",
        "displayName": "uatfuser",
        "name": {
          "givenName": "uattestin",
          "familyName": "Marcsnewl06"
        },
        "emails": [
          {
            "primary": true,
            "value": "scimmewarch06@opsera.us",
            "type": "work"
          }
        ],
        "roles": [
          {
            "value": "auditor"
          }
        ]
      }
      """
    Then the response status code should be 200
    And the response should have property "schemas"
