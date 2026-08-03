Feature: Get Run Status without Authentication
  As an API consumer
  I want to verify authentication is required for getting run status

  Background:
    Given the API is available

  @pipeline @run @status @negative @auth @prod @get
  Scenario: Get run status without authentication expects 500 error
    When I send a GET request to "/api/v2/pipelines/6463a424a761d000124d12bf/runs/1" without authentication
    Then the response status code should be 500
