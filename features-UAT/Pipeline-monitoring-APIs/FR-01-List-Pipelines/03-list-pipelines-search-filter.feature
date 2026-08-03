Feature: List Pipelines with Search Filter
  As an API consumer
  I want to list pipelines with search filter in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @list @search @prod
  Scenario: List pipelines with search filter
    When I send a GET request to "/api/v2/pipelines" with search filter
    Then the response status code should be 200
