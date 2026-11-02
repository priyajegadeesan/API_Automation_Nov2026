@ignore
Feature: Logs_Task
  As an API consumer
  I want to test the Logs_Task endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @UAT-USER @get
  Scenario: Logs_Task API call
    When I send a GET request to "/api/v1/logs/task"
    Then the response status code should be 200
    And the response should be valid
