Feature: Prod v2 Stop Pipeline
  As an API consumer
  I want to stop a pipeline using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @stop @prod
  Scenario: Stop a pipeline in production
    When I send a POST request to "/api/v2/actions" with stop action
    Then the response status code should be 200
