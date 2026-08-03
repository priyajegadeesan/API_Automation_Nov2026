Feature: Get Members From Group PROD
  As an API consumer
  I want to retrieve group members in PROD environment
  So that I can view production group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @members @get @prod
  Scenario: Get group members successfully in PROD
    When I send a GET request to "/api/v2/usermanagement/group/pipelineadmins/memberships"
    Then the response status code should be 200