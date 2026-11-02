Feature: Logs_v2_User Actions_Range
  As an API consumer
  I want to test the Logs_v2_User Actions_Range endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @UAT-USER @get
  Scenario: Logs_v2_User Actions_Range API call
    When I send a GET request to "/api/v2/logs/audit/user?start_date=2025-03-31&start_time=09:10:10&end_date=2025-04-01&end_time=11:15:10&type=code-scan,compliance-sec,container-scan,security-gate"
    Then the response status code should be 200
    And the response should be valid
