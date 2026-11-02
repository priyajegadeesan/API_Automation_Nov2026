Feature: Pipeline Single Delete UAT
  As an API consumer
  I want to create and then delete a single pipeline in UAT environment
  So that I can verify pipeline lifecycle management

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @uat @pipeline @create @bulk-delete @smoke
  Scenario: Create a pipeline named Bulk delete-1 in UAT
    When I send a POST request to "/api/v2/pipelines" with body:
      """
      {
        "name": "Bulk delete-1",
        "description": "Pipeline created for bulk delete testing",
        "workflow": {
          "plan": [
            {
              "_id": "653a85ef6ce89a00123f63d8",
              "name": "Jmeter XML",
              "tool": {
                "tool_identifier": "jmeter",
                "threshold": {
                  "type": "",
                  "value": ""
                },
                "configuration": {
                  "buildType": "gradle",
                  "defaultBranch": "master",
                  "dockerName": "",
                  "dockerTagName": "",
                  "gitBranch": "master",
                  "gitRepository": "Testing-example",
                  "gitToolId": "621634fe2d193d0011f0ace2",
                  "gitUrl": "https://github.com/purusothamanns/Testing-example",
                  "gitUserName": "purushothaman@opsera.io",
                  "jmeterFileName": "jmeter-jmx-file/Sample-plan.jmx",
                  "projectId": "purusothamanns/Testing-example",
                  "repoId": "purusothamanns/Testing-example",
                  "service": "github",
                  "sshUrl": "git@github.com:purusothamanns/Testing-example.git",
                  "type": "xml",
                  "workspace": "",
                  "workspaceDeleteFlag": false
                }
              },
              "type": {
                "0": "performance-test"
              },
              "orchestration_type": "standard",
              "active": true
            }
          ]
        }
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
    And I store the created pipeline ID

  @uat @pipeline @delete @bulk-delete @smoke
  Scenario: Delete the pipeline created in Scenario 1
    When I delete the pipeline created in the previous scenario
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
