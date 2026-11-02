Feature: Get Run Status with Negative Run Count
  As an API consumer
  I want to verify error handling for negative run count

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @run @status @UAT-USER @negative @UAT-USER @prod @UAT-USER @get
  Scenario: Get run status with negative run count
    When I send a GET request to "/api/v2/pipelines/61be284b4e719c002cd7ef6f/runs/-1"
    Then the response status code should be 400
    And the response should have property "status"
    And the response should have property "metadata"
