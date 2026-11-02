Feature: UAT v2 Pipeline Status
  As an API consumer
  I want to check pipeline status using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @status @UAT-USER @uat @UAT-USER @post
  Scenario: Get pipeline execution status in UAT
    When I send a POST request to "/api/v2/actions" with body:
      """
      {
        "action": "status",
        "type": "pipeline",
        "version": "1",
        "target": ["6960d2cd46d374b9da16cb3e"]
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
