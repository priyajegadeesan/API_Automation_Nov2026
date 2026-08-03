Feature: Logs_User Actions
  As an API consumer
  I want to test the Logs_User Actions endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: Logs_User Actions API call
    When I send a GET request to "/api/v1/logs/user/actions??date=<2024-07-30>&?count=<2>"
    Then the response status code should be 200
    And the response should be valid
