

Feature: Allure Demo Feature

 Background:
    When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick"
    When I login as: "walker@jw.com", "password"

  Scenario: Allure Demo Scenario Passed
    Given I setup step
    When I action step
    Then I observe step

  Scenario: Allure Demo Scenario Failed
    Given I setup step
    When I action step
    Then I observe failed step

  Scenario: Allure Demo Scenario Broken
    Given I setup step
    When I action broken step
    Then I observe failed step

  Scenario: Allure Demo Scenario Flaky
    Given I setup step
    When I action unstable step
    Then I observe step
