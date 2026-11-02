Feature: UAT v2 Pipeline Search
  As an API consumer
  I want to search for pipelines using v2 API in UAT environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @search @uat
  Scenario: Search for pipelines in UAT
    When I send a GET request to "/api/v2/search?t=pipeline&s=6a3256a41454a14447cee7f8"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "ids"
