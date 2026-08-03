Feature: Get Run Status for Completed Run
  As an API consumer
  I want to get run status for a completed run

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @run @status @prod @get
  Scenario: Get run status for completed run (run 65)
    When I send a GET request to "/api/v2/pipelines/69623b4825f0aea264fb192e/runs/65"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
