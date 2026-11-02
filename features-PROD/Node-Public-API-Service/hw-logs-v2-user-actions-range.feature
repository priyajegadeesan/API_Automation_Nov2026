@ignore
Feature: HW_Logs_v2_User Actions_Range
  As an API consumer
  I want to test the HW_Logs_v2_User Actions_Range endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: HW_Logs_v2_User Actions_Range API call
    When I send a GET request to "https://api.honeywell.opsera.io/api/v2/logs/audit/user?range=1h&type=code-scan"
    Then the response status code should be 200
    And the response should be valid
