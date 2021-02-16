# Eduzz Bitcoin Market Challenge

The purpose of this code is to create a scenario to show coding abilities, as requested in
[this repo]

## About:
### The Architecture
The app was made in NodeJS with Express framework. The database chosen was MongoDB via Atlas, which means is running on the cloud right now to simplify the project structure. In order to reach for MongoDB, the app leans on Mongoose (which is nice since it validates data acconding to the model before actually saving it). 

The app was designed respecting the MVC pattern and correct HTTP methods. You can see some middlewares too as they serve as a way to keep the controllers clean.
Mocha + Chai were used to test the application, and testdouble to mock DB calls.

### Difficulties & Challenges:
Well, I've never done any NodeJS applicattion, but I think it went neatly. The major difficulties was whether to code "Java-like", which means explicitly showing classes, methods and attributes, extending and inheriting classes, or to just link a function to a HTTP route. For means of clear code understanding and easy maintenance, I choose to keep it simple with the function-like style native to JavaScript (since the class keywork came out in ECMA2015). If you would like to see some more in-depth OO techniques, you're welcome to check some college projects as [this one].

The only test I made is not even correct. I couldn't correctly mock the Mongoose calls inside the controllers. I tried various times, with testdouble and even Sinon/stub... did not work. At firts I thought it was something related to Mongoose's returning Promisses, but it was not.
Docker was not challengin at all. Since I'm not using swarm, Vagrant or Kubernets, dockerizing the app was easy.

I could not use any of the suggested SMTP servers, they all tried to bill me, or had a great lack of documentation (in particular the MailChimp one).


## Running the application:

First, make sure you're connected to the internet and git, npm, docker and Postman are already installed on your computer.

#### Clone the repo into your desired directory:
```markdown
    $ git clone https://github.com/joaovsa/eduzz-challenge
    $ cd eduzz-challenge
``` 

#### Install NPM Dependencies:
```markdown
    $ npm install
``` 

#### Build the Docker image:
```markdown
    $ docker build -t <your username>/node-web-app .
``` 

#### Run the image mapping the app port:
```markdown
    $ docker run -p 49160:8080 -d <your username>/node-web-app
``` 
## Calling the API:

For the bellow steps, we will use Postman. But you can use anything that helps you with HTTP calls.

In the example screenshots, I assume that you correctly followed the docker steps above and mapped your 8080 port to 49160.

#### Check the running server

![get test](./readme_imgs/test_call.png?raw=true "get test")

Make a GET request via Post to the root URL, just do make sure

```markdown
    http://localhost:49160/
```
You should receive the message as the image shows.

#### Sign Up

Before use the application, you must have an user. To do so, make a POST request to 

```markdown
    http://localhost:49160/api/auth/signup
``` 

Make sure the body of the request is set to 'JSON'. The JSON you must send should look like this:
```markdown
    {
        "username":"<your-user-name>",
        "password":"<your-password>",
        "email":"<your-email>@<your-domain"
    }
``` 
![user_created](./readme_imgs/user_created.png?raw=true "user created")


If the desired username or password are already in use, you won't be able to proceed.
![username_in_use](./readme_imgs/username_in_use.png?raw=true "username_in_use")


![email_in_use](./readme_imgs/user_created.png?raw=true "email_in_use")




[this repo]: https://gist.github.com/caferrari/a25734c6e941f6386e7156aa723f28a8
[this one]: https://github.com/joaovsa/labcompila_cianeto
