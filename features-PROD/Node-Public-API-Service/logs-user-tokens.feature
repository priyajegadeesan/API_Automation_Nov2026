Feature: Logs_User Tokens
  As an API consumer
  I want to test the Logs_User Tokens endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: Logs_User Tokens API call
    When I send a GET request to "/api/v1/logs/user/tokens??date=<2024-08-01>&?scope=<API Access>"
    Then the response status code should be 200
    And the response should be valid
