# Examination platform

## Table of contents
* [About the project](#about-the-project)
* [Technologies](#technologies)
* [Prerequisites](#prerequisites)
* [How to use](#how-to-use)

## About the project
The project was created as part of my Engineering Thesis. The purpose of the project was to create a universal, online examination platform that would allow for:
* creating and managing exams,
* creating and managing groups,
* sharing exams with users and groups,
* review of exam results.

![sample exam](https://github.com/SkinTom/examination-platform/blob/master/img/add-question.jpg)

## Technologies
API was created with:
* Java 8
* Spring Boot 
* Spring MVC
* Spring Data
* Spring Security
* Hibernate
* MySQL

Client was created with:
* Angular 10
* TypeScript
* Sass(SCSS)
* HTML5
* Angular Material

## Prerequisites
Before running the application you have to:
* install MySQL on your local device and create a schema called _exam-platform_
* have a development environemnt (eg IntelliJ IDEA, Visual Studio Code)
* clone the repo `git clone https://github.com/SkinTom/examination-platform.git`

## How to use
Run API on a local device:
1. Import API app to InteliiJ IDEA or other development environment
2. Run app

Run Client on a local device:
1. Open the 'client' folder in VCS or other development environment
2. Open the terminal and enter the command `ng serve -o`

Now you can start using the application :D
