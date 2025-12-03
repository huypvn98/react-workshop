ReactJS Assigment 

A Simple KYC 

Overview 

Duration: 14 days  

Assignment boilerplate is provided in advance with minimum setup, trainee will complete the assignment by using knowledge learn during the training 

Boiler is built with 

React v18 

React Router v6 

Tailwind 

Flowbite and Flowbite Admin Template 

Note: This is an example of boilerplate libraries; you can create your own.  

API reused API from Dummy JSON  

UI Components docs 

https://flowbite.com/docs/components/forms/  

https://mui.com/ 

https://ant.design/ 

Goals:  

Understanding the Fundamentals  

Mastering JSX and Component 

Understanding State Management 

Understanding Forms and Routing, Styling,  

Building a real-world Project 

Understand the architecture and structure of a ReactJS project 

 

Minimum requirement: 

KYC Screen 

UI Library: Not specific, it’s your flavor, recommend using provided boilerplate project, sample UI templates is provided in advance 

Validation input Not specific, suggestion is React Hook Form or your custom input component  

How to work with routing: React Router 

FE API interaction implementation 

Folder structure 

State management (How and when to use global state and local state) 

Props understanding 

React hooks implementation (useState, useEffect, useMemo, useCallback, customHooks) 

 

 

Requirements: 

Application Logic 

Input Validation (Details provided in each screen) 

Screens navigation 

Login is required, user must login to use the app. 

Normal user => Redirect to Profile page 

Officer => Redirect to Client list 

Select each client => Selected client’s Profile screen 

Shared data: Profile and KYC share current client’s personal information. 

RBAC 

Normal User can see only its own Profile page. 

Officer can see all user profiles. 

Only Officer can access Review page. 

Officer can access all user reviewed results. 

Normal user can see only its reviewed results. 

Technical: 

Api implementation 

Understand how to fetch and send data using APIS, leveraging tool like, fetch or Axios.  

Be able to handle different states of an API call (loading, success, error) effectively  

Understand how to implement error handling and retires for failed requests.  

State management 

State usage: 

Use local state for component-specific data that does not need to be shared (e.g., form inputs, toggles). 

Use global state for data shared across multiple components or pages (e.g., user authentication, theme preferences). 

State Management Library: 

Use a consistent global state management library (e.g., Redux, Zustand, or React Context API) if needed. 

Project structure requirement 

Utilities and Helpers 

Create a utils folder for helper functions and utilities for example:  

utils/ 

------string.ts 

------date.ts 

------validation.ts 

State management:  

Keep global state management logic in a store or state folder for example:  

store/ 

----user-store.ts 

----index.ts 

Hooks:  

Create a separate hooks folder for reusable custom hooks. For hooks that are not reusable, place them in the folder where they are used 

hooks/ 

----use-auth.ts 

----use-fetch.ts 

 

Feature-Specific Components 

Group components by feature or page to maintain clear boundaries for example: features/ 

-----/user-profile 

--------/components 

-------------/user-card 

-------------/user-detail 

Component organization  

Each React component must reside in its own dedicated file. 

Avoid placing multiple components in a single file. 

Reusable components should be created for the entire application 

Follow a consistent folder structure for example:  

components/ 

---button/ 

-------index.tsx 

-------button.scss 

-------button.spec.tsx 

Note: If you have your own structure, please go ahead. 

 

Code Quality and Practices (not required, but it would be great if you follow them):  

Linting and Formatting: 

Use tools like ESLint and Prettier to enforce consistent code style and detect violations (e.g., multiple components in one file). 

Unit Testing: 

Write unit tests for components to validate their reusability and behavior under different state scenarios. 

Deployment (not required, but it would be great if you follow them): 

Hosting: Deploy the application to a hosting service like Vercel, Netlify, or GitHub Pages. 

Example: Create deployment scripts and provide instructions for deployment. 

Performance Optimization: 

Code Splitting and Lazy Loading: Use code splitting and lazy loading to improve performance. 

Example: Use React.lazy and Suspense to lazy load components. 

 

Screens 

 

Screen: Login (User/Officer) 

 

Username: Required, Length (8-10) 

Password: Required, Length (12-16), Content({[a-zA-Z]}{[9-0]}{@,#,&!}) 

c:\PROJECT\react-workshop\templates\Login.png
[text](templates/login.html)

Landing page 

c:\PROJECT\react-workshop\templates\LandingPage.png

Screen: User Profile (User/Officer) 

Officer is always read-only 

User can edit their information 

 

Button Edit -> Personal Information - Edit Mode (User only) 

Button KYC -> Navigate to KYC Screen – Edit Mode (User only) 

 

Basic Information:  

First name: Required 

Middle name: Optional 

Last name: Required 

Date of Birth: DD/MM/YYYY: Required 

Age: Number (Calculated) 

Contact Information: Multiples, Phone number(s) and email(s) address. 

Address: Multiples, residential addresses 

Country: Required 

City: Required 

Street: Required 

Postal Code: Optional 

Type: Required, Enum: Mailing, Work 

Emails:  

Email: Required, Email 

Type: Required, Enum: Work, Personal 

Preferred: Required, Boolean 

Phones: 

Number: Required, String 

Type: Required, Enum: Work, Personal 

Preferred: Required, Boolean 

Identification Documents: At least one of passport, national ID card, or driver's license. 

ID: Required, File 

Driver License: Required, File 

Occupation and Employment Information: Multiples or empty Including employer details. 

Name: Required 

From Year: Required, number (YYYY) 

To Year:  Optional, number (YYYY), greater than From Year 

Screen: KYC(User/Officer) 

Officer is always read-only 

User can edit their information 

 

Section: Personal information (same as Personal Information) 

 

Section: Financial status: 

Incomes(A): Multiples 

Type: Salary, Investment, Others 

Amount (Currency) 

Assets(B): Multiples 

Type: Bond, Liquidity, Real Estate, Others 

Amount (Number, Currency) 

Liabilities(C): Multiples 

Type: Personal Loan, Real Estate Loan, Others 

Amount (Currency) 

Source of Wealth(D): Multiples 

Type: Inheritance, Donation 

Amount (Currency) 

Net Worth 

Client net worth: (A) + (B) + (C) + (D) 

Investment Experience and Objectives:  

Experience in financial markets: Options 

< 5 years 

> 5 and < 10 years 

> 10 years 

Risk Tolerance: Options 

10% 

30% 

All-in 

c:\PROJECT\react-workshop\templates\edit-kyc.png

Screen: Preview (Officer) 

List of pending review 

Table 

Name 

Date 

Actions:  

Select and preview a profile in read-only mode 

Inline actions (Approve/Reject) 

c:\PROJECT\react-workshop\templates\kyc-summission.png

Screen: Results (Officer) 

List of reviewed results 

Table 

Name 

Date 

Final Status: Approved/Rejected 

Reference Help: 

Patterns React 

Follow company codding standard  

Setup project:  

Create react app 

Vite 

Reference Api mock:  

Dummy Json 

Public Apis 

Reference UI mock 

tailspark 

creative-tim 