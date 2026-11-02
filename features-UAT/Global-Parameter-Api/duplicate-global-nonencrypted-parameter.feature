Feature: Duplicate Global nonencrypted Parameter
  As an API consumer
  I want to handle duplicate parameter creation
  So that I can ensure parameter names are unique

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @create @UAT-USER @duplicate @UAT-USER @uat
  Scenario: Create duplicate non-encrypted parameter
    When I send a POST request to "/api/v2/global-parameters/create" with body:
      """
      {
        "name": "duplicate-test-param",
        "scope": "",
        "parentId": "",
        "value": "duplicate-value",
        "active": true,
        "vaultEnabled": false,
        "vaultKey": "",
        "selectField": false,
        "lookupListId": "",
        "roles": [
          {
            "role": "administrator",
            "user": "keerthiga@opsera.us",
            "group": null
          }
        ],
        "tags": []
      }
      """
    Then the response status code should be 500
