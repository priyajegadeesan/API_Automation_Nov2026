Feature: Prod v2 Delete Pipeline
  As an API consumer
  I want to delete a pipeline using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @delete @prod
  Scenario: Delete an existing pipeline in production
    When I send a POST request to "/api/v2/actions" with delete action
    Then the response status code should be 200
