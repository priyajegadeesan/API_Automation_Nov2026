Feature: Get Run Status with Valid Pipeline and Run Count
  As an API consumer
  I want to get run status for valid pipeline and run count

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @prod @get
  Scenario: Get run status with valid pipeline ID and run count
    When I send a GET request to "/api/v2/pipelines/6463a424a761d000124d12bf/runs/349"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
