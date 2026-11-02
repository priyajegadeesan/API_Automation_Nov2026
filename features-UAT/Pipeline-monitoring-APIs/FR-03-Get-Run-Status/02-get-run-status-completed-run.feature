Feature: Get Run Status for Completed Run
  As an API consumer
  I want to get run status for a completed run

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @run @status @UAT-USER @uat @UAT-USER @get
  Scenario: Get run status for completed run (run 12)
    When I send a GET request to "/api/v2/pipelines/6a1410b4e70b93d416d27074/runs/12"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
