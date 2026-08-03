Feature: Prod v2 Create Jenkins Pipeline
  As an API consumer
  I want to create a Jenkins pipeline using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @create @jenkins @prod
  Scenario: Create a new Jenkins pipeline in production
    When I send a POST request to "/api/v2/pipelines" with Jenkins configuration
    Then the response status code should be 200
