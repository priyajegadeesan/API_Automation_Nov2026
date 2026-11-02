Feature: Prod v2 Update Pipeline
  As an API consumer
  I want to update a pipeline using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @update @prod
  Scenario: Update an existing pipeline in production
    When I send a POST request to "/api/v2/actions" with body:
      """
      {
        "action": "update",
        "type": "pipeline",
        "version": "1",
        "target": "6aabf33f9036e2667b736697",
        "settings": {
          "name": "SDLC _ AUTOMATION PIPELINE - Updated via API",
          "description": "Updated description via API automation test"
        }
      }
      """
    Then the response status code should be 400
    And the response should be a valid JSON
    And the response should have property "message"
