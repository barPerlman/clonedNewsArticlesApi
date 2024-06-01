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


### Change log:

1. Changed the "from" query param value to "2024-05-01" inside the url in the getNews function, due to a subscription limit error received when trying to get breaking news by: http://127.0.0.1:8000/api/breaking-news?limit=25:
   'You are trying to request results too far in the past. Your plan permits you to request articles as far back as 2024-04-29, but you have requested 2024-03-11. You may need to upgrade to a paid plan.'
2. Changed the api/news endpoint to return only one article, as required in the assignment doc.
3. Enabled cross origin requests
