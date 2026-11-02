Feature: Create lookuplist new
  As an API consumer
  I want to test the Create lookuplist new endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @uat
  Scenario: Create lookuplist new API call
    When I send a POST request to "/api/v2/parameters/pipeline/6a1410b4e70b93d416d27074" with body:
      """
      {
        "name": "opsera-test-newss-${timestamp}",
        "scope": "pipeline",
        "parentId": "64001a07be0b9e0027a09b11",
        "value": "test",
        "active": true,
        "vaultEnabled": false,
        "vaultKey": "",
        "selectField": true,
        "lookupListId": "",
        "selectOptions": [
          {
            "value": "test",
            "displayName": "test"
          },
          {
            "value": "prod",
            "displayName": "prod"
          },
          {
            "value": "peods",
            "displayName": "peods"
          }
        ],
        "roles": [],
        "tags": []
      }
      """
    Then the response status code should be 200
    And the response should have property "data"
