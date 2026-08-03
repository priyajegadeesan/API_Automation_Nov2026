Feature: Prod v2 Create Jmeter Pipeline
  As an API consumer
  I want to create a Jmeter pipeline using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @pipeline @create @jmeter @prod
  Scenario: Create a new Jmeter pipeline in production
    When I send a POST request to "/api/v2/pipelines" with Jmeter configuration
    Then the response status code should be 200
