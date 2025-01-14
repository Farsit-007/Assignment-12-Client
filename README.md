# Website Name : Hope In Drops
# Admin : 

 => Email : hopeindrops@gmail.com

 => Password : hopeinDrops12
 
# [Live Link](https://assignment-12-c49c1.web.app/)  
# [Server Repository](https://github.com/Farsit-007/Hope-In-Drops-Server)

# Overview

• User Roles:

 => Admin: Full access to user, donation, and content management.

 => Donor: Register, view/respond to donation requests, update profile.

 => Volunteer: Create/manage donation requests and content (limited).

• Role Management:

 => Default role is "donor"; roles can be changed by admin via database.

• Authentication:

 => Registration: Users sign up with email, name, avatar, blood group, district, upazila, and password.

 => Login: Users log in with email and password.

• Dashboard Layout:

 => Responsive with sidebar navigation; different views for donors, admins, and volunteers.

• Donor Dashboard:

 => View/manage own donation requests, update profile information.

• Admin Dashboard:

 => View statistics, manage users, donation requests, and content.

• Volunteer Dashboard:

 => Manage donation requests and content, but with limited permissions compared to admin.

• Public Pages:

 => Home with join/search donor options, search donors, view pending donation requests.

• Request Details:

 => Shows full request details; logged-in users can offer donations.

• JWT Implementation:

 => JWTs for login and securing private APIs, stored in localStorage, with middleware for verification and role-based access.


 # Major Features :
  • Admin Panels <br/>
  • Payment Method with Stripe <br/>
  • Notify Donor Requestor by Email using NodeMailer <br/>

 # Technologies : 
  • React.js <br/>
  • Tailwind.css <br/>
  • Firebase  <br/>
  • React-router-dom <br/>
  • Node.js <br/>
  • Express.js <br/>
  • MongoDb <br/>
  • NodeMailer <br/>
  • Stripe <br/>

 ### Setup .env file

```js
VITE_APIKEY = ...
VITE_AUTHDOMAIN = ...
VITE_PROJECTID = ...
VITE_STORAGEBUCKET = ...
VITE_MESSAGINGSENDERID = ...
VITE_APPID = ...
VITE_API_URL = ...
VITE_STRIPE_APIKEY= ...
```

### Install NPM

```shell
npm i
```

### Run the Project

```shell
npm run dev
``` 







