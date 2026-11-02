@ignore
Feature: Pipeline notification
  As an API consumer
  I want to test the Pipeline notification endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: Pipeline notification API call
    When I send a GET request to "/api/v1/pipeline/run/notification"
    Then the response status code should be 200
    And the response should be valid
