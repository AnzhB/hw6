Feature: Users subscription

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick"

    When I login as: "walker@jw.com", "password"
    When I click on Login submitButton

     Scenario: Users creation and subscription user 1

  # When I go to "Create User" menu item
   When I click Create User menu item
   When I fill user form:
      """
      email: 'test@test.com'
      password: 'U&cmpYsxK9'
      Address: 'Rustaveli 20-21'
      Address2: 'flor 4'
      City: 'Tbilisi'
      Zip: 222567
      Description: 'test user'
      """
   When I wait for "5" second
   When I go to "subscribtion" menu item
   When I fill  subscribtion form:
     """
     plan: 'Education'   
     years: '10'
     user: 'test@test.com'
     description: 'description'
     """
    When I wait for "5" second
   #  When I click list of Subscriptions 2 menu item
   # When I check the texts of the elements:

    Then I expect to see the corresponding data for first user in List of Subscribtions table

    