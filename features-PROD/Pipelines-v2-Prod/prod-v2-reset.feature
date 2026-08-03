Feature: Prod v2 Reset Pipeline
  As an API consumer
  I want to reset a pipeline using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @reset @prod
  Scenario: Reset a pipeline in production
    When I send a POST request to "/api/v2/actions" with reset action
    Then the response status code should be 200
