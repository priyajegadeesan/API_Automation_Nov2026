@uat @pipeline @create @post
Feature: Pipeline create test
  As an API consumer
  I want to create a new pipeline via API
  So that I can verify pipeline creation functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api
  Scenario: Create a pipeline with workflow steps
    When I send a POST request to "/api/v2/pipelines" with body:
      """
      {
        "name": "E2E Test Pipeline Creation-26Oct",
        "description": "Pipeline created via API",
        "type": ["ci-cd"],
        "workflow": {
          "plan": [
            {
              "_id": "507f1f77bcf86cd799439011",
              "name": "Build Step",
              "tool": {
                "tool_identifier": "github",
                "configuration": {}
              },
              "active": true,
              "dependencies": []
            },
            {
              "_id": "507f1f77bcf86cd799439012",
              "name": "Test Step",
              "tool": {
                "tool_identifier": "jenkins",
                "configuration": {}
              },
              "active": true,
              "dependencies": ["Build Step"]
            }
          ]
        },
        "tags": ["test"],
        "metadata": {}
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
    And the response should have property "data"
