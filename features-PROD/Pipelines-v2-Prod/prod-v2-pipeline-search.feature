Feature: Prod v2 Pipeline Search
  As an API consumer
  I want to search for pipelines using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @search @prod
  Scenario: Search for pipelines in production
    When I send a GET request to "/api/v2/search" with pipeline filter
    Then the response status code should be 200
