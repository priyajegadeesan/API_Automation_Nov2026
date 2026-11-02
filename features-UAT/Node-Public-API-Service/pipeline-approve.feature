@ignore
Feature: Pipeline approve
  As an API consumer
  I want to test the Pipeline approve endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @node-api @get @uat
  Scenario: Pipeline approve API call
    When I send a GET request to "https://api.opsera-uat.opsera.io/workflow/orchestration/status/6a30fea7e6b2376206ede071"
    Then the response status code should be 200
    And the response should be a valid JSON
