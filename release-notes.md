<div style="text-align: center;">
    <img src="./public/imgs/dark/logo-with-text-long.png" style="width: 100%">
    <h1 style="font-size: 64px; color: #FF4C30; font-family: ''">Release Notes</h1>
</div>

# 11/11/2023 - Initial Commit
- Created the initial commit for this project.
- Similar File Directory to [Personal Website Structure](https://github.com/Reubzz/personal-website)


### 13/11/2023 - Update 0.0.1 
- Added Assets (Icons / Imgs)
- Added Home Page
- Added Css
- Added Dabase Connection
- Added Cars Schema for database


### 14/11/2023 - Update 0.0.2
- Updated Home Page (Added Basic HTML Skeleton)

### 22/01/2024 - Update 0.0.3
- Updated Home Page (main skeleton with styling completed)
- added new Assets (icons/imgs)
- added `users.js` a schema for database
- added `home.js` for homepage 
- cleaned up code in `root.js`

### 25/01/2024 - Update 0.0.4
- Homepage - Mobile Layout Ready
- Added Animations to Homepage
- Rearranged items around for better UI/UX
- Separated `.scss` files for better code manageability.
- Separated `.js` files for better code manageability.
- Added Login Page & Registeration Page
- Added About Page & Contact Us Page 
- Added new background image assets
- Separated repeating html components to different files for reusability
- Reusable `.html`/`.ejs` Components made available on path `/views/components/*.ejs`
- Added `fontawesome pro`

### 26/01/2024 - Update 0.0.5
- Requesting `components` link changed to api folder + Link changed to api route [From `/views/components/<xyz>` to `/api/components/<xyz>`]
- allowed adding query parameters to components [`title-banner` custom title and description allowed]
- removed `site-font.scss` -> added it to `variables.scss` [recompiled all css files]- removed `site-font.scss` -> added it to `variables.scss` [recompiled all css files]
- added meta tags to all pages
- added vehicles page 

### 29/01/2024 - Update 0.0.6
- Cleaned up `.css` and `.scss` files using `sass partial files`. (reduced number of css files)
- added vehicles page 
- added sort button and search bar in vehicles page.
- added Authentication Module (`alpha update`)

### 2/2/2024 - Update 0.0.7
- Fixed Buttons/Links in Homepage
- Added Dummy Terms And Condition Page 
- Added How We Work Page [Funny]

# 5/2/2024 - Update 0.1.0 [Major]
- **Added Authentication Modules** [Working]
- Added a back button to Login & Register Page
- Changed Components to use uniform data from `config.json` instead of static data

### 6/2/2024 - Update 0.1.1 
- Removed unnecessary Codes
- Improved User Interface
- Updated Navbar to show Logged In User and dropdown  menu with options like "Logout" or "Profile".
- Added Account/Profile Page

### 7/2/2024 - Update 0.1.2 
- Added a new route `api/cars` to add new cars data (`create-cars-data.js`)
- Edited `cars.js` schema to better fit the exact dataset and simplicity
- Updated Vehicles page Css
- Updated Accounts Page meta tags

### 10/02/2024 -  Update v0.1.3 
- Fixed Typo errors in `contact.ejs`
- Fixed Login/Register Function where it was not redirecting and refreshing page after successful login / registration
- Changed Navbar Javascript file name from `mobile-navbar.js` to `navbar.js`.
- Made Full Screen Navbar Dropdown for Mobile Layout

### 11/02/2024 - Update v0.1.4 
- Removed Unnesccessary Imports from scss files. 
- Added Subscribe Email List Api - (`api/subscribe`)
- Fixed issue where user didn't reach original page they were on before login/register
    - Now user redirects back to its initial page he was on before he clicked login button. 

### 15/02/2024 - Update v0.1.5
- Made Navbar Sticky to the top of the screen.

### 17/02/2024 - Update v0.1.5 - Part 2 (minor)
- Fixed Authentication Page - All fields are now required and field validations done on front end Javascript. 

### 26/02/2024 - Update v0.1.5 - Part 3 (minor)
- Fixed email subscription button submission in footer

### 3/3/2024 - Update v0.1.6 
- Added Account Edit Feature.
- All Fields can now be edited/updated by the user on the account page. `/account`
- Account Page css overhaul
- Added a new api route for account editing : `/api/account/edit`
- Separated Error Popup to a separate component for reusablity
- Added Car Page & Showing car details when clicking on any car

### 3/3/2024 - Update v0.1.7 
- Added Login Modal to Car Page (such that a logged in user is required to continue booking)
- Fixed All Buttons across website - design changed for it to pop more on hover. 

### 5/3/2024 - Update v0.1.8 
- Added Booking Page (part 1) [pay now flow yet to do]
- Completed Car Page UI
- User must log in or register to access this booking page
- Fixed Homepage quick booking section - Removed Date Picker as not needed atm.
- Added `jwtSign.js` to `/models/functions/jwt/jwtSign.js` for easier cookie signing process to login / refresh user data. Reduced Repeated Code.

# 8/3/2024 - Update v0.2.0 [Major]
- Order Creation and Transaction Creation API route : `api/booking/order-create`
- Added Stripe API as Payment Gateway
- Added `offers` schema to dynamically add and remove offers available while booking cars.
- Created `orders` and `transactions` schemas in database.
- Completed Booking Page
- Added a new Payment Page

### 12/3/2024 - Update v0.2.1 
- Updated Datepicker in Booking page to block past dates and already booked dates 
- Changed Datepicker to use package `pikaday` and `moment.js` datepicker rather than browser's native datepicker 
- Fixed Bug where dropoff date was earlier than pickup date
- Added a new Array Field in Cars Schema that holds all the dates that the car is already booked 
- Added a new Array Field in Order Schema that holds all the dates that the car is booked for
- Added Payment Complete page that updates transaction to sucess and books the dates of the car.
- Added new API routes 
    - `/api/booking/order-create` - creates a order 
    - `/api/booking/order-complete` - Completes an order
    - `/api/booking/transaction-complete` - Completes a Transaction
    - `/api/booking/book-car-dates` - Books Car's Dates
- Added `moment.js` to help deal with dates 

# 14/3/2024 - Update v0.3.0 [Major]
- Added Invoice package `easyinvoice` 
- Added field for Invoices in mongodb.
- Added new Invoice API - `/api/invoice` 
    - Creates a new Invoice PDF in `Base64` format if not already created.
    - if already created, returns the Base64 string of the pdf file from mongodb.
    - Added a `force=1` parameter which will create a new Invoice even if one exists.
- Added Cancellation Policy page.
- Order Bookings now reflect on usersDB
- Booking page now dynamically takes booked dates from the ordersDB by using the carID as foriegn key query parameter.
- Added `/cancellation-policy` url
- Changed `/account` url to `/account/profile`
- Added View All Bookings page - `/account/bookings` 
- Added option to cancel orders 
- Added new API route `/api/cancel-order` which cancels an order by ID
- Added All Bookings Page in Accounts Section
- Additional Minor Changes / Fixes / Quality of Life Changes

### 16/3/2024 - Update v0.3.1 
- Added Address autocomplete for users who have it saved
- Added Gst display to booking page 
- Fixed Cancel button in account bookings page
- Updated Invoice design - Added background template and changed format. 
- Added phone field in orders schema
- Minor Changes / Fixes / Quality of Life Changes
- Restricted Booking page datepicker to allow dates 60 days ahead only. 

# 20/3/2024 - Update v0.4.0 [Major]
- Added Admin Page - Update 1
- Updated email subscribers API - To now be able to delete users on `DELETE` Method
- Completed Frontend Code for Admin page
- Updated `root.js` with  admin routes and routes needed for admin page
- Updated `paymentsIntent` page with *100 as stripe takes last two numbers in decimal. 

### 22/3/2024 - Update v0.4.1
- Changed Styles (scss/css) of Admin Page.
- Changed functions and layout of Admin page - `admin.ejs`
- Added `/public/js/admin.js`
    - Created a common `callAPI()` dynamic function with serves all action buttons of the admin panel
    - Added dynamic query - which reloads/refreshes the page with fresh data and opens the same tab page that was opened before clicking the action button
    
- Added new api route for transaction related data `/api/transactions`
- Changed car api route from `/api/create-car-data` to `/api/cars`
- Added new routes to cars api - `delete`, `status` 
- Changed Cars Schema - `status` field from a @Boolean to @String - true = available & false = unavailable. 
- Updated other pages according to the Change above.
- Changed Cars Schema - `id` field to required false. Making custom Ids obselete. 
- Added new routes to `/api/account` - `role` and `delete`
- Added new files with functions for the above route `changeRole.js` and `deleteUser.js`
- Changed Trasaction Complete API from `/api/booking/transaction-complete` to `/api/transaction/complete`
- Added minor change that now allows transaction complete api to allow transaction id or order id any one to complete the transaction. 
- Added new routes to `/api/transaction` route - `/reactivate` `/refund` `/cancel`
- Added functions in folder - `/functions/transactions/` - `cancel.js` `complete.js` `reactivate.js` `refund.js`
- Changed Logic of `cancel-order.js` - Added Refunded and Cancelled Orders logic
- Changed Logic of `order-create.js` - New Orders are now status as `pending`
- Changed `root.js` for admin panel route to be accessable only by people having `admin` role. 
- Changed `return_url` in `/public/js/payment.js` - made it dynamic so it works with all domains and development automatically. 
- Fixed Cancel Booking Button in Admin Panel. 
- Fixed `cancel-order.js` to allow id in body and query both.

### 23/3/2024 - Update v0.4.1 - Part 2
- Added Add Car feature. 
- Added `add-car.ejs`, `add-car.scss`, `add-car.css`, `add-car.js` - For above.
- Completed API Route for adding cars.
- Added AWS s3 connection using - `aws-sdk` package.
- Added `aws-sdk` package.
- Added `multer` package to manage image uploads. 
- Added 100mb limit for all forms with file uploads

### 23/3/2024 - Update v0.4.2 
- Added additional security measures for all API. 
- Added ACL method middleware `/middleware/checkOrigin.js` - to only allow `localhost` and `reubz.io` domains. (config.json)
- Added a new Auth Check middleware `/middleware/apiAuthentication.js` - where only admin are allowed access to api. 
- Updated all API's to use the above new methods. 
- Removed `body-parser` from authentication API. Using express.json now instead of bodyparser
- Removed `body-parser` from packages and Node modules.

### 26/3/2024 - Update v0.4.3 
- Added Changes to `db.js` to integrate Mongoose and AWS S3 configuration into one DB File. 
- Made Changes in all Mongoose Schema Files to integrate this Change. 
- Changed CSS Styles to for pfp to fit container element in Navbar and Account Edit Screen. 
- Added PFP Update/Edit Feature. 
- Added new api route `/api/account/edit` - `PUT` Req - for PFP edits.
- Changed existing account details editing to the same API Route but with `PATCH` Req. 

### 27/3/2024 - Update v0.4.4
- Added Auto Inoice Emails on Transaction Completion 
- Added nodemailer module to send emails. 
- Added new `sendEmail.js` file in `/models/functions` to dynamically send emails from any other file. Just Import it and send emails. 
- Added `email.ejs` in new `/templates` folder. Template for Invoice Email Messages.

### 29/3/2024 - Update v0.4.5
- Added Reviews & Ratings System. 
- Created a new Model Schema called `reviews`.
- Added `reviews.js` api route (Post = Add review , Delete = Delete Review).
- Updated Design of Reviews Screen
- Added ability for Admins to delete any and everyones reviews, while a user can delete only their own comment.
- Updated frontend `car.js` to delete/add reviews and show/hide the add review form for logged in users. 

### 1/4/2024 - Update v0.4.6 
- Completed Contact Us Form. 
- Added new Api Route - `/api/contact` which on POST req. Forwards the message with all the details of the form to `contact@reubz.io`.
- Updated `contact.js` in front end to Use this Above api and respond apropriately. 
- Updated All Newly Added Pages Css to make it Mobile Responsive.
- Updated Admin Page layout to work well with Mobile and Improved Accessibility, Added Aditional Data to Cards across all types.
- Update Meta Tags in few pages for better SEO.
- Added 404 Page and added 404 route
- Added Dark Theme for full website
- Added a Dark Theme Toggle for logged in users in Drop down Menu. 
- Updated `navbar.js` to handle theme changes.
- Updated all pages css to allow dark theme. 
- Updated all variables to allow dark theme. 
- Removed Unnecessary Icons and replaced them with FontAwesome Icons.

### 4/4/2024 - Update 0.4.7 
- Minor Changes to color palette. 
- Fixed decimal value bug in car page and bookings page for total price and gst price
- Updated final price calculation with fixed precision and returned number
- Updated Navbar Mobile Design to fit all buttons properly
- Fixed home page Book Now Form. 
- Added car type field in schema [Hatchback, SUV, etc]
- Changed Homepage and added front end js code to be able to dynamically Select Car Type from dropdown menu and update the Cars dropdown automatically according to the Type.

### 7/4/2024 - Update 0.4.8 (Part 1)
- Added New Assets for Dark Mode. 
- Added a system in Navbar.js so dark mode assets can be changed from `data-dark` dataset from the element and vice versa from `data-light`. 
- Updated `Navbar.ejs` and `Footer.ejs` logo imgs with two new data tags - `data-light` and `data-dark` which holds the src to the light and dark mode assets.
- Changed `config.json` to support light mode and dark mode assets src urls and file paths. 
> [!DETAILED]
> This diff includes changes to the `config.json` file to update the logo configuration, adding separate light and dark mode paths for the alternate, short, and secondary logos. The `navbar.js` file has been updated to toggle the dark and light themes, and to change the assets accordingly using the `data-dark` and `data-light` datasets. The `footer.ejs` and `navbar.ejs` files have also been updated to include the new logo configuration and to use the `data-dark` and `data-light` datasets for the logo images. Additionally, the release notes have been updated to reflect these changes.