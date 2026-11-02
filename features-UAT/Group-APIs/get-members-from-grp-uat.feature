Feature: Get Members From Group UAT
  As an API consumer
  I want to retrieve group members in UAT environment
  So that I can view UAT group membership

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @groups @members @UAT-USER @get @UAT-USER @uat
  Scenario: Get group members successfully in UAT
    When I send a GET request to "/api/v2/usermanagement/group/pipelineadmins/memberships"
    Then the response status code should be 200