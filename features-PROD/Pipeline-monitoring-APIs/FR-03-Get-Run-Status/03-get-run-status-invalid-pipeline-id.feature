Feature: Get Run Status with Invalid Pipeline ID
  As an API consumer
  I want to verify error handling for invalid pipeline ID

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @negative @prod @get
  Scenario: Get run status with invalid pipeline ID
    When I send a GET request to "/api/v2/pipelines/not-valid/runs/1"
    Then the response status code should be 400
    And the response should have property "status"
    And the response should have property "metadata"
