Feature: Pipeline source
  As an API consumer
  I want to test the Pipeline source endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: Pipeline source API call
    When I send a GET request to "/api/v2/settings/pipeline/source"
    Then the response status code should be 200
    And the response should be valid
