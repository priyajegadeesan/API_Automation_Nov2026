Feature: Logs_User Actions_Range
  As an API consumer
  I want to test the Logs_User Actions_Range endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get @prod
  Scenario: Logs_User Actions_Range API call
    When I send a GET request to "/api/v1/logs/user/actions?range=1h&jobType=CODE SCAN"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
