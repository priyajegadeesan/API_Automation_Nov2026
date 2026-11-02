@uat @registry @get @tools
Feature: Registry Tool
  As an API consumer
  I want to retrieve registry tools
  So that I can view available tools in the registry

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api
  Scenario: Get all registry tools
    When I send a GET request to "/api/v2/tools/registry"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
    And the response should have property "data"
