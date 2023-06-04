

## Project Name: DevCamper Backend API Specifications
Created the backend for a bootcamp directory website.

## Task in this project
### Bootcamps
- [x] List all bootcamps in the database
   * [x] Pagination
   * [x] Select specific fields in result
   * [x] Limit number of results
   * [x] Filter by fields
- [x] Search bootcamps by radius from zipcode
  * [x] Use a geocoder to get exact location and coords from a single address field
- [x] Get single bootcamp
- [x] Create new bootcamp
  * [x] Authenticated users only
  * [x] Must have the role "publisher" or "admin"
  * [x] Only one bootcamp per publisher (admins can create more)
  * [x] Field validation via Mongoose
- [x] Upload a photo for bootcamp
  * [x] Owner only
  * [x] Photo will be uploaded to local filesystem
- [x] Update bootcamps
  * [x] Owner only
  * [x] Validation on update
- [x] Delete Bootcamp
  * [x] Owner only
- [x] Calculate the average cost of all courses for a bootcamp
- [x] Calculate the average rating from the reviews for a bootcamp

### Courses
- [x] List all courses for bootcamp
- [x] List all courses in general
  * [x] Pagination, filtering, etc
- [x] Get single course
- [x] Create new course
  * [x] Authenticated users only
  * [x] Must have the role "publisher" or "admin"
  * [x] Only the owner or an admin can create a course for a bootcamp
  * [x] Publishers can create multiple courses
- [x] Update course
  * [x] Owner only
- [x] Delete course
  * [x] Owner only
  
### Reviews
- [x] List all reviews for a bootcamp
- [x] List all reviews in general
  * [x] Pagination, filtering, etc
- [x] Get a single review
- [x] Create a review
  * [x] Authenticated users only
  * [x] Must have the role "user" or "admin" (no publishers)
- [x] Update review
  * [x] Owner only
- [x] Delete review
  * [x] Owner only

### Users & Authentication
- [x] Authentication will be ton using JWT/cookies
  * [x] JWT and cookie should expire in 30 days
- [x] User registration
  * [x] Register as a "user" or "publisher"
  * [x] Once registered, a token will be sent along with a cookie (token = xxx)
  * [x] Passwords must be hashed
- [x] User login
  * [x] User can login with email and password
  * [x] Plain text password will compare with stored hashed password
  * [x] Once logged in, a token will be sent along with a cookie (token = xxx)
- [x] User logout
  * [x] Cookie will be sent to set token = none
- [x] Get user
  * [x] Route to get the currently logged in user (via token)
- [x] Password reset (lost password)
  * [x] User can request to reset password
  * [x] A hashed token will be emailed to the users registered email address
  * [x] A put request can be made to the generated url to reset password
  * [x] The token will expire after 10 minutes
- [x] Update user info
  * [x] Authenticated user only
  * [x] Separate route to update password
- [x] User CRUD
  * [x] Admin only
- vUsers can only be made admin by updating the database field manually

## Security
- [x] Encrypt passwords and reset tokens
- [x] Prevent cross site scripting - XSS
- [x] Prevent NoSQL injections
- [x] Add a rate limit for requests of 100 requests per 10 minutes
- [x] Protect against http param polution
- [x] Add headers for security (helmet)
- [x] Use cors to make API public (for now)

## Documentation
- [x] Use Postman to create documentation
- [x] Use docgen to create HTML files from Postman
- [x] Add html files as the / route for the api

## Deployment (Digital Ocean)
- [x] Push to Github
- [ ] Create a droplet
- [ ] Clone repo on to server
- [ ] Use PM2 process manager
- [ ] Enable firewall (ufw) and open needed ports
- [ ] Create an NGINX reverse proxy for port 80
- [ ] Connect a domain name
- [ ] Install an SSL using Let's Encrypt

## List of Package Used
- .env
- express
- nodemon
- morgan
- mongoose
- colors
- slugify
- node-geocoder
- express-fileupload
- jsonwebtoken
- bcryptjs
- cookie-parser
- nodemailer
- express-mongo-sanitize




## Note
- npm run dev => to run development mode
- run seeder file node seeder -i

## Other
For geo coding

https://developer.mapquest.com/user/me/profile


For mail

https://mailtrap.io/home


Sql Ingection

https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb

https://documenter.getpostman.com/view/21155935/2s93sW9bCZ#66ebbd59-d984-41bb-8061-7e7347ccbb64

https://github.com/thedevsaddam/docgen

docgen build -i dc_postman_collection.json -o index.html

##Usage

Rename "config/config.env.env" to config/config.env and update value and setting

##Install Dependecy
```
npm install
```

## Run App
```
npm run dev
```

## Run in prod
```
npm start
```

- version 1.0.0
- Licence: MIT
