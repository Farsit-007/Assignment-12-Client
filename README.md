# Website Name : Hope In Drops
# Admin : 
 => Email : hopeindrops@gmail.com
 => Password : hopeinDrops12
# Live Link : https://assignment-12-c49c1.web.app/

#About Hope In Drops

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
•JWT Implementation:
 => JWTs for login and securing private APIs, stored in localStorage, with middleware for verification and role-based access.






- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
