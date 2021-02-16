# Eduzz Bitcoin Market Challenge

The purpose of this code is to create a scenario to show coding abilities, as requested in
[this repo]

## About:
### The Architecture
The app was made in NodeJS with Express framework. The database chosen was MongoDB via Atlas, which means is running on the cloud right now to simplify the project 
ure. In order to reach for MongoDB, the app leans on Mongoose (which is nice since it validates data according to the model before actually saving it). 

The app was designed respecting the MVC pattern and correct HTTP methods. You can see some middlewares too as they serve as a way to keep the controllers clean.
Mocha + Chai were used to test the application, and testdouble to mock DB calls.

### Difficulties & Challenges:
Well, I've never done any NodeJS applicattion, but I think it went neatly. The major difficulties was whether to code "Java-like", which means explicitly showing classes, methods and attributes, extending and inheriting classes, or to just link a function to a HTTP route. For means of clear code understanding and easy maintenance, I choose to keep it simple with the function-like style native to JavaScript (since the class keywork came out in ECMA2015). If you would like to see some more in-depth OO techniques, you're welcome to check some college projects as [this one].

The only test I made is not even correct. I couldn't correctly mock the Mongoose calls inside the controllers. I tried various times, with testdouble and even Sinon/stub... did not work. At firts I thought it was something related to Mongoose's returning Promisses, but it was not.
Docker was not challengin at all. Since I'm not using swarm, Vagrant or Kubernets, dockerizing the app was easy.


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

### Check the running server

![get test](./readme_imgs/test_call.png?raw=true "get test")

Make a GET request via Post to the root URL, just do make sure

```markdown
    http://localhost:49160/
```
You should receive the message as the image shows.

### Sign Up

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

![email_in_use](./readme_imgs/email_in_use.png?raw=true "email_in_use")

### Sign In

Now that you've created your user, we can continue. As you signin, you will receive your JWT token, with which you may call other API endpoints.
Send a POST request, with your username and password to: 

```markdown
    http://localhost:49160/api/auth/signin
``` 

![signin](./readme_imgs/signin.png?raw=true "signin")

Make sure your password is correct, otherwise the API won't let you Sign In:

![signin-invalid-pwd](./readme_imgs/signin-invalid-pwd.png?raw=true "signin-invalid-pwd")


For now on, we will need the JWT token: copy and paste the 'acessToken' string to the Headers section of Postman, and name the key as 'x-access-token' and paste the value in the corresponding field.

This is the JWT token in action that we are preparing for further API requests. Keep in mind that the token expires after a certain while.

### Create your wallet

When you created your user, the API did not create the wallet with all the currencies. This behavior is meant to keep the database clean of 'unactivated users'. Of course, this is a future increment of the API, counting on a 'activate your user' e-mail. So as soon as the user had their e-mail confirmed, we would create a wallet. 

As the current implementation goes, you have to create a wallet manually.

Simply make a POST request to

```markdown
    http://localhost:49160/api/wallet/create
``` 

And your JSON body should look like this:

```markdown
   {
    "username":<your-username>,
    "currencies":[{
        "currency":"BRL",
        "balance": 0.00
    },
    {
        "currency":"BTC",
        "balance": 0.0000000
    }]
}
``` 

In the currencies array, you can add any currencies you want when you create your wallet. But, at the moment, the API will only accept deposits in BRL. This array structure was made for code reusing purpose. In the future, maybe there will be a necessity of adding USD balance, or even add Cryptocurrencies to your wallet via transference from someone else.


![wallet_created](./readme_imgs/wallet_created.png?raw=true "wallet_created")



If your JWT was not set correctly or it's not in the header, the following response will be sent:

![create_wallet_forbidden](./readme_imgs/create_wallet_forbidden.png?raw=true "create_wallet_forbidden")


### Check your wallet

Maybe now you want to check if your wallet was really created? Well, just send a GET request to:

```markdown
    http://localhost:49160/api/wallet/balance
``` 

![wallet_balance](./readme_imgs/wallet_balance.png?raw=true "wallet_balance")


Just remember, keep the JWT string in the header. Otherwise, the following will happen:

![wallet_balance_forbidden](./readme_imgs/wallet_balance_forbidden.png?raw=true "wallet_balance_forbidden")


### Add balance for a currency (make a deposit)

Now, the fun part. You can add balance for the currencies the API supports, which at the moment is just BRL. BTC is allowed too, but just for a test purpose, so you can see that the API is ready for distinct currencies. 


Aim your POST request to:

```markdown
    http://localhost:49160/api/wallet/add
``` 

You can add any amount you want for the currencies that were added when your created your wallet. Again, the array structure allows you to add various currencies at one time, reducing the need of N API calls for N currencies.

The value you add at balance is not a overwrite. Instead, it adds with the amount that you already have at your wallet. Try it out.

```markdown
   {
    "username":<your-username>,
    "currencies":[{
        "currency":"BRL",
        "balance": 1337
    }
}
``` 

As soon as you add the balance, the API **will send an e-mail** to the user's e-mail. So, if you don't see at your inbox at first glance, please *check your SPAM box*.

When you add monney to your wallet, the following message is sent:

![wallet_add](./readme_imgs/wallet_add.png?raw=true "wallet_add")


In the other hand, if yout try to add unsupported currencies, the amount won't be added, you won't receive an e-mail, but the API will warn you:

![wallet_balance_forbidden](./readme_imgs/wallet_balance_forbidden.png?raw=true "wallet_balance_forbidden")




[this repo]: https://gist.github.com/caferrari/a25734c6e941f6386e7156aa723f28a8
[this one]: https://github.com/joaovsa/labcompila_cianeto
