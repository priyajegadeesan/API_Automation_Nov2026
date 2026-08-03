Feature: Get Run Status with Both IDs Invalid
  As an API consumer
  I want to verify error handling when both pipeline ID and run count are invalid

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @negative @prod @get
  Scenario: Get run status with both pipeline ID and run count invalid
    When I send a GET request to "/api/v2/pipelines/xyz/runs/abc"
    Then the response status code should be 400
    And the response should have property "status"
    And the response should have property "metadata"
