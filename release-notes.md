# Release Notes

### 11/11/2023 - Initial Commit
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

## 5/2/2024 - Update 0.1.0 [Major]
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