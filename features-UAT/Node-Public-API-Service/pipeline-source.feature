Feature: Pipeline source
  As an API consumer
  I want to test the Pipeline source endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: Pipeline source API call
    When I send a POST request to "/api/v2/settings/pipeline/source" with body:
      """
      {
        "action": "update-source",
        "targetPipelines": [
          "6a1410b4e70b93d416d27074"
        ],
        "targetTools": [
          "sonar",
          "command-line",
          "workflow"
        ],
        "settings": {
          "service": "github",
          "registryAccountId": "62f29a0e0a09630012a8e9ee",
          "gitAccount": "Opsera Engineering: GitHub",
          "gitHttpsUrl": "https://github.com/OpseraEngineering/node-analytics-api-service.git",
          "gitSshUrl": "git@github.com:OpseraEngineering/node-analytics-api-service.git",
          "repoId": "OpseraEngineering/node-analytics-api-service",
          "repository": "node-analytics-api-service",
          "branch": "master"
        }
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
