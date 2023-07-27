# new feature
# Tags: optional
# Author: Klevis Muda
# EPIC: sprite-11
# US:  sprite-222, sprite-333


@Jira-286
Feature: Test Elements Menu

  Scenario: Verify user can enter new data into the table

    Given I go to page "elements" of the application
    Then I go to submenu "Web Tables" of the application

    Then Click on "Add" button

    Then Fill the Registration Form
      | First Name | Klevis        |
      | Last Name  | Muda          |
      | Email      | test@test.com |
      | Age        | 30            |
      | Salary     | 12345         |
      | Department | QA            |

    Then Click on "Submit" button

    Then Check that Registration Form is saved with first name "Klevis"
      | Klevis | Muda | 30 | test@test.com | 12345 | QA |


  Scenario: Verify user can enter new data into the table

    Given I go to page "automation-practice-form" of the application

    Then Fill or Select the fields of Student Registration Form
      | First Name      | Klevis          |
      | Last Name       | Muda            |
      | Email           | test@test.com   |
      | Gender          | Male            |
      | Mobile          | 0123456789      |
      | Date of Birth   | 12 April 1989   |
      | Subjects        | Task            |
      | Hobbies         | Music           |
      | Picture         | spriteCloud.png |
      | Current Address | Albania         |
      | State           | NCR             |
      | City            | Delhi           |
    Then Click on "Submit" button

    Then Check that Student Registration Form is saved
      | Label          | Value           |
      | Student Name   | Klevis Muda     |
      | Student Email  | test@test.com   |
      | Gender         | Male            |
      | Mobile         | 0123456789      |
      | Date of Birth  | 12 April,1989   |
      | Subjects       |                 |
      | Hobbies        | Music           |
      | Picture        | spriteCloud.png |
      | Address        | Albania         |
      | State and City | NCR Delhi       |
    Then Click on "Close" button
