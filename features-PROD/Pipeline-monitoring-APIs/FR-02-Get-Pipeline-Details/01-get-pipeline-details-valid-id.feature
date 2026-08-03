Feature: Get Pipeline Details with Valid ID
  As an API consumer
  I want to get pipeline details using a valid ID in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @details @prod @get
  Scenario: Get pipeline details with valid pipeline ID
    When I send a GET request to "/api/v2/pipelines/6463a424a761d000124d12bf"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
