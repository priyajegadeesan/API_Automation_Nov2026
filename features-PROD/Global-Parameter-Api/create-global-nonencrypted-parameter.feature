Feature: Create Global NonEncrypted Parameter
  As an API consumer
  I want to create a global non-encrypted parameter
  So that I can store configuration values

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @create @nonencrypted @uat
  Scenario: Create non-encrypted parameter successfully
    When I send a POST request to "/api/v2/global-parameters/create" with body:
      """
      {
        "name": "opsera-nonencry-public-api-${timestamp}",
        "scope": "",
        "parentId": "",
        "value": "uat-parameter-value",
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
    Then the response status code should be 200
    And the response should have property "data"
