@ignore
Feature: Pipeline create test
  As an API consumer
  I want to test the Pipeline create test endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @prod
  Scenario: Pipeline create test API call
    When I send a POST request to "/api/v1/pipeline/create" with body:
      """
      {
        "name": "API pipeline create",
        "description": "Create a new template from scratch.",
        "owner": "6a0ac2184557a4c76f8a7c94",
        "roles": [
          {
            "role": "administrator",
            "user": "keerthiga@opsera.us",
            "group": null
          }
        ],
        "tags": [],
        "type": [],
        "organizationName": "opsera",
        "account": "org104d-acc0",
        "project": {
          "name": "",
          "project_id": ""
        },
        "workflow": {
          "source": {
            "name": "",
            "service": "",
            "repository": "",
            "branch": "",
            "key": "",
            "trigger_active": false,
            "secondary_branches": []
          },
          "plan": [
            {
              "name": "",
              "description": "",
              "trigger": [],
              "type": [],
              "notification": [],
              "tags": [],
              "active": true,
              "dependencies": []
            }
          ],
          "schedule": {
            "start_date": null,
            "end_date": null,
            "frequency": ""
          },
          "last_step": {
            "status": "stopped",
            "run_count": 0
          },
          "run_count": 0
        },
        "active": true,
        "template": "",
        "templateIdentifier": "",
        "_id": "",
        "createdAt": "",
        "updatedAt": "",
        "__v": 0
      }
      """
    Then the response status code should be 200
