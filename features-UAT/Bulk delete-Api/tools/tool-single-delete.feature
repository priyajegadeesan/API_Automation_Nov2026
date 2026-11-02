Feature: Tool Single Delete UAT
  As an API consumer
  I want to create and then delete a single tool in UAT environment
  So that I can verify tool lifecycle management

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @uat @tool @create @bulk-delete @smoke
  Scenario: Create a tool named Bulk delete-1 in UAT
    When I send a POST request to "/api/v1/registry/create" with body:
      """
      {
        "name": "Bulk delete-1",
        "tool_identifier": "github",
        "tool_type_identifier": "source",
        "account": "67caf6137242d37590c9f060",
        "description": "Tool created for bulk delete testing"
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "name"
    And I store the created tool ID

  @uat @tool @delete @bulk-delete @smoke
  Scenario: Delete the tool created in Scenario 1
    When I delete the tool created in the previous scenario
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
