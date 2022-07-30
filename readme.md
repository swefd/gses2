
# GSES2 BTC application

An API for sending an email to all subscribed users of the current exchange rate of BTC/UAH (Bitcoin to the Ukrainian hryvnia).


Uses the Binance API.
## Authors

- [@Oleksandr Chornous](https://github.com/)


## Config Variables

To run this project, you will **need to add/change** the following variables in `./config/config.json` file.
####  App Variables:

* `port` - Express server port


####  SMTP Variables:
* `host` - SMTP server address

* `port` - SMTP server port

* `user` - username

* `pass` - password 

####  DB Variables:

* `path` - Path to the `db.txt` file 



## API Reference


* def port : 8080

### Get BTC/UAH rate

```http
  GET /api/rate
```

* No parameters

#### Responses
`Integer` BTC/UAH rate 

### Subscribe an email

```http
  POST /api/subscribe/${email}
```

| Parameter | Type     | Description        |
|:----------|:---------|:-------------------|
| `email`   | `string` | **Email address**. |

####  -> Responses

 * Status: 200 OK
```json
{"message":"test@gmail.com successfully subscribed"}
```

* Status: 409 Conflict
```json
{"message":"test@gmail.com  already subscribed"}
```


### Send email to all subscribers
```http
  POST /api/sendEmails
```
* No parameters

#### -> Responses

* Status: 200 OK
```json
{
    "message": "Emails sent successfully",
    "emailAddress": [
        "test@gmail.com",
        "test1@gmail.com",
        "test2@gmail.com"
    ]
}
```

* Status: 409 Conflict
```json
  {"message":"123test@gmail.com  already subscribed"}
```
## Run in Docker

Clone the project

```bash
  git clone https://link-to-project
```
Go to the project directory

```bash
  cd gses2
```
Build image

```bash
  docker build -t swefd:gses2 . 
```
Run container

```bash
  docker run --name gses2 -p 8080:8080/tcp -d swefd:gses2
```
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


