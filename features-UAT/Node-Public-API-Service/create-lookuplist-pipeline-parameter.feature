Feature: Create lookuplist Pipeline Parameter
  As an API consumer
  I want to test the Create lookuplist Pipeline Parameter endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @post @UAT-USER @uat
  Scenario: Create lookuplist Pipeline Parameter API call
    When I send a POST request to "/api/v2/parameters/pipeline/6a1410b4e70b93d416d27074" with body:
      """
      {
        "name": "opsera-test-newll-${timestamp}",
        "scope": "pipeline",
        "active": true,
        "vaultEnabled": false,
        "vaultKey": "",
        "selectField": true,
        "lookupListId": "676a7b5dcee62f001227c07f",
        "value": "test",
        "roles": [],
        "tags": []
      }
      """
    Then the response status code should be 200
    And the response should have property "data"
