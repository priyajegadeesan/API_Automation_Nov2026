Feature: Delete Group PROD
  As an API consumer
  I want to delete a group in PROD environment
  So that I can remove groups that are no longer needed

  Background:
    Given the API is available
    And I am authenticated with valid PROD credentials

  @groups @delete @prod
  Scenario: Delete an existing group successfully
    Given I have an existing group ID
    When I send a DELETE request to "/api/v2/usermanagement/group/{id}"
    Then the response status code should be 200
    And the group should be deleted successfully