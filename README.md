## Task in this project

## Project Name: DevCamper Backend API Specifications
Created the backend for a bootcamp directory website.
### Bootcamps
- List all bootcamps in the database
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Search bootcamps by radius from zipcode
  * Use a geocoder to get exact location and coords from a single address field
- Get single bootcamp
- Create new bootcamp
  * Authenticated users only
  * Must have the role "publisher" or "admin"
  * Only one bootcamp per publisher (admins can create more)
  * Field validation via Mongoose
- Upload a photo for bootcamp
  * Owner only
  * Photo will be uploaded to local filesystem
- Update bootcamps
  * Owner only
  * Validation on update
- Delete Bootcamp
  * Owner only
- Calculate the average cost of all courses for a bootcamp
- Calculate the average rating from the reviews for a bootcamp

### Courses
- List all courses for bootcamp
- List all courses in general
  * Pagination, filtering, etc
- Get single course
- Create new course
  * Authenticated users only
  * Must have the role "publisher" or "admin"
  * Only the owner or an admin can create a course for a bootcamp
  * Publishers can create multiple courses
- Update course
  * Owner only
- Delete course
  * Owner only
  
### Reviews
- List all reviews for a bootcamp
- List all reviews in general
  * Pagination, filtering, etc
- Get a single review
- Create a review
  * Authenticated users only
  * Must have the role "user" or "admin" (no publishers)
- Update review
  * Owner only
- Delete review
  * Owner only

### Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Register as a "user" or "publisher"
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the users registered email address
  * A put request can be made to the generated url to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

## Security
- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

## Documentation
- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api

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
``

## Run App
```
npm run dev
```

## RUn in prod
```
npm start
```

- version 1.0.0
- Licence: MIT
