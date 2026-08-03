Feature: Prod v2 Update Pipeline
  As an API consumer
  I want to update a pipeline using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @update @prod
  Scenario: Update an existing pipeline in production
    When I send a POST request to "/api/v2/actions" with update action
    Then the response status code should be 200
