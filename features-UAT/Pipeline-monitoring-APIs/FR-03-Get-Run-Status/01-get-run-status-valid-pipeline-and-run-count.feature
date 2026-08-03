Feature: Get Run Status with Valid Pipeline and Run Count
  As an API consumer
  I want to get run status for valid pipeline and run count

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @uat @get
  Scenario: Get run status with valid pipeline ID and run count
    When I send a GET request to "/api/v2/pipelines/6a1410b4e70b93d416d27074/runs/12"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
