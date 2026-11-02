Feature: Pipeline Bulk Delete UAT
  As an API consumer
  I want to create multiple pipelines and bulk delete them in UAT environment
  So that I can efficiently remove multiple pipelines at once

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @uat @pipeline @create @bulk-delete @smoke
  Scenario: Create 10 pipelines consecutively named Bulk delete-1 to Bulk delete-10
    When I create 10 pipelines with base name "Bulk delete"
    Then 10 pipeline IDs should be stored for bulk deletion

  @uat @pipeline @delete @bulk-delete @smoke
  Scenario: Bulk delete all 10 pipelines created in the previous scenario
    When I bulk delete all pipelines created in previous scenarios
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
