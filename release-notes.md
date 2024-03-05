<h1 style="font-size: 64px; color: #FF4C30; ">Release Notes</h1>

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