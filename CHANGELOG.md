# Changelog
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## v0.2.0-beta - 2015-06-19
### Added
- The 'Thank you' page that shows up after voting.
- A school authentication page to verify that the user is from PSHS-EVC. A passcode is required to be entered in the page to continue. Uses AJAX if the passcode entered is correct.
- A logo at the top of the page.
- A script that calculates the vote statistics, prints the information to the screen, and saves the information to a text file. It also logs script executions.

### Updated
- The UI has been subtly updated.

### Removed
- The 'Click <candidate name> to un/vote him/her.' label has been removed because it was unneccessary.

### Notes
- A tally chart of the votes was to be added but was decided that it will be removed because it might cause cheating or bribery among voters.
- The obstacles here were trying to figure out how to save data to the database, adding custom user attributes, using the custom attributes in the templates to have a different view depending on the user's attributes (view the templates in the source code to know the different conditions for each view), and working with AJAX POST using jQuery.

## v0.1.0-alpha - 2015-06-12
### Added
- The full code of SAElections.
- Home page.
- Incomplete voting page.
- Facebook authentication support.
- Important information in the README.

### Notes (added on 2015-06-19)
- Most of the development of this version was focused on making the UI look beautiful, and a good UX.
- A good portion of the initial development of this version was focused on trying to figure out how to work with Django. There were I was tempted to rewrite the app in PHP. The initial obstacle was trying to figure out how to use templates and static files in a custom directory. The issues were fixed in five days (for templates) and two days (for static files).
- This version was written from scratch because it would be easier if this app is written with Django. The legacy version (which was incomplete) was written with PHP.