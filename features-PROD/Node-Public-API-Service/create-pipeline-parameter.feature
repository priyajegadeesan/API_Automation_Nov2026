Feature: Create Pipeline Parameter
  As an API consumer
  I want to test the Create Pipeline Parameter endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @prod
  Scenario: Create Pipeline Parameter API call
    When I send a POST request to "/api/v2/parameters/pipeline/6a2bea3f20d869fa2927dce1" with body:
      """
      {
        "name": "opsera-createparamapiencry-${timestamp}",
        "scope": "pipeline",
        "value": "testing encrypted Parameter via API",
        "active": true,
        "vaultEnabled": true,
        "vaultKey": "",
        "selectField": false,
        "lookupListId": "",
        "roles": [],
        "tags": []
      }
      """
    Then the response status code should be 200
    And the response should have property "data"
