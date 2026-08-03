Feature: Get Run Status with Zero Run Count
  As an API consumer
  I want to verify error handling for zero run count

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @negative @prod @get
  Scenario: Get run status with zero run count
    When I send a GET request to "/api/v2/pipelines/69623b4825f0aea264fb192e/runs/0"
    Then the response status code should be 400
    And the response should have property "status"
    And the response should have property "metadata"
