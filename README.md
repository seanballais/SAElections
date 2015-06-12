# Student Allance Elections System
Student Alliance Elections System is a voting system for the Student Alliance elections of PSHS-EVC. The voting system is a web app built using Django.

NOTE: SAElections uses Python 3.4.

## Setting Up SAElections In Your Local Machine
At the moment, development in Linux is only supported. Should one find out that the methodology below works on other platforms, feel free to update this README and do a pull request (See *Contributing*).

**Linux**
The instructions below assume that you already have Git, pip, and virtualenv installed. Please refer to your distribution's documentation for installing the required packages in your system.

1. Download a zipped copy of SAElections or type the following command in the Terminal.
````
git clone https://github.com/seanballais/SAElections.git
````
2. In the Terminal, extract the ZIP file if you downloaded a zipped copy and then go to the directory where you extracted or cloned `SAElections`.
````
cd /path/to/extracted/directory
````
3. Once inside the directory, type the following commands.
````
source venv/bin/activate
./SAElections/manage.py runserver
````
4. You are done! To access the web site, open your browser and go to `http://localhost:8000`. Have fun!

## Contributing
Contributing to SAElections is encouraged to create better software and help you gain experience. Even forking this project to create your own version is highly encouraged as long as you comply with the project's license. See *License*.

To start contributing, follow the steps below. It is assumed that Git, pip, and virtualenv are already installed in your system.
**Linux**
For the time being, only instructions for contributing in a Linux system is available. This is a great contribution opportunity if you are contributing in a different platform.
1. Fork this repo.
2. Clone your repo in your system.
3. Make sure to `git checkout develop` to get the latest code.
4. Make changes to the code.
5. Rebase your code from this repo to get the latest changes.
6. Make sure your code does not conflict with this repo's code and works properly.
7. Commit your changes and make a pull request.
8. You are done! Congratulations! Wait for responses regarding your pull request. This might take a day or so depending on the response rate.

Your code will be subjected to tested and code review to make sure your code works, and is consistent with the coding style. The coding style document will still be written. Hey, another contribution opportunity!

## Changelog
See [*CHANGELOG*][CHANGELOG.md].

## License
See [*LICENSE*][LICENSE.md].

Copyright &copy; 2015. All Rights Reserved. Sean Francis N. Ballais.
