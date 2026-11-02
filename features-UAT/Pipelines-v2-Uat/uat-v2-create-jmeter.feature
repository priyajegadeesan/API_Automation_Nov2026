Feature: UAT v2 Create Jmeter Pipeline
  As an API consumer
  I want to create a Jmeter pipeline using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @create @UAT-USER @jmeter @UAT-USER @uat
  Scenario: Create a new Jmeter pipeline in UAT
    When I send a POST request to "/api/v2/pipelines" with Jmeter configuration
    Then the response status code should be 200
