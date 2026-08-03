Feature: Patch Members To Group PROD
  As an API consumer
  I want to patch/update group members in PROD
  So that I can modify group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @members @patch @prod
  Scenario: Patch group members successfully
    When I send a PATCH request to "/api/v2/usermanagement/group/opsera-hugegroupmarch19/members" with body:
      """
      [
        "userregmarch19guest@protonmail.com",
        "hemanthreddy071@proton.me",
        "insightstesting@insights.com",
        "sampleemai@sampl.com",
        "scimprodtestingmarch20@gmail.com",
        "qamar19@protonmail.com",
        "sonusainicse@gmail.com",
        "createusermar2003@protonmail.com",
        "createusermar2003auditor@protonmail.com",
        "qa-prodsdasdadaasda@protonmail.com",
        "april1@protonmail.com"
      ]
      """
    Then the response status code should be 200
    And the response should have property "message"