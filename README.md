# News Articles API

## Endpoints:

### Get Latest News

Returns all the latest news
Method: GET

Endpoint: `http://127.0.0.1:8000/api/news`

### Get Breaking news

Get the breaking news
Method: GET

You can define the limit of results by passing the `limit` query parameter.    
Default limit is 10.
Max limit is 100.
Minimum limit is 0.

**Example:**   
Endpoint: `http://127.0.0.1:8000/api/breaking-news?limit=25`


### Get Breaking news content

Get the breaking news content
Method: GET

With this endpoint you can retrieve content (+ description) of breaking news.
In aim to use this endpoint you need to use the Get Breaking news request to get an article id 
for which you would like to get content.
The id is sent as a url path parameter.

**Example:**   
Endpoint: `http://127.0.0.1:8000/api/breaking-news/content/f825244f-9f54-4295-bc35-dc5ef211f867`


### Change log:
1. Changed the "from" query param value to "2024-05-10" inside the url in the getNews function, due to a subscription limit error received when trying to get breaking news by: http://127.0.0.1:8000/api/breaking-news?limit=25:
   'You are trying to request results too far in the past. Your plan permits you to request articles as far back as 2024-04-29, but you have requested 2024-03-11. You may need to upgrade to a paid plan.'
2. Changed the api/news endpoint to return only one article, as required in the assignment doc.
3. Enabled cross origin requests.

## Instructions for running application using docker container
This Backend service wraped up as an docker image saved at: https://hub.docker.com/r/barper/news-articles-server 
Run the following steps to run it as a docker container locally:
* Prerequisit - verify you have docker engine installed locally.

1. From your terminal, run the command: "docker pull barper/news-articles-server".
2. run "docker run -p 8000:8000 barper/news-articles-server".
