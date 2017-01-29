# cybersecuritybase-project-1
First project to Cyber Security Base Course


This project is created to be broken and insecure. I also wanted to test how node.js works
This project contains five flaws from OWASP TOP 10 list

Now to the answer for project's question:

Getting everything ready:
Go to https://nodejs.org/en/download/ and download correct file to your system. Run installer, at least in Windows 10 there is no need to change anything in installer. After installing Node.js (npm comes with it) navigate your console to the cybersecuritybase-project-1 folder. Now type following command: “npm install”, this will install everything needed for this project and it may take a while. Now that npm install is complete navigate to public/javascripts/ and run “node populateDatabase.js”. This will populate and create SQLite database. After that navigate back to cybersecuritybase-project-1 folder and run “npm start”, it will start the server and you can access project with browser in localhost:8080.
Identifying flaws:
SQL injection (A1)
In a main page we have a Log in form we can use SQL injection to log in. In this project we can access first user in database, which is in this case an admin with following injection:
We can type anything in Username, but to Password we can type: “' or '1'='1”. Now when we press submit we will be logged in as an admin.
Broken authentication and Session management (A2)
Via A4 and A6 we can see every users’ password. (read more info from those points)
With Insecure Direct object references we can check everyone’s password and also if we use OWASP ZAP we can see that everything that is sent is a plain text.
Cross-site Scripting (A3)
To use Cross-site Scripting we can use messages in this website. Those messages will be stored into database so we can use Stored XSS. When we are logged in as a user we have a form to submit new messages with a title. Let’s type anything for a title, for example “XSS!” and to the Message we type our XSS. Let’s type a following message: “<script> document.body.style.setProperty("-webkit-transform", "rotate(-90deg)", null); </script> “. This XSS isn’t doing to do anything nasty except from rotating the page.
Insecure Direct Object References (A4)
When we have logged in we see that URL is http://localhost:8080/users/[number], when we change this number we can access different users and their information. So this number is their id and we can also use this for SQL injections if we want to (1 or 1=1 to the number and we get every user and their information)
Sensitive Data Exposure (A6)
When we inspect html-code in main or user-page we find a comment: “<!-- if there is errors from database, please contact admin to check /static/database.db  -->”. So now we type in our URL “localhost:8080/static/database.db”. Now we can download the used database and because it is SQLite3 database, there is no need for password. We can inspect this database via basic notepad and we can find in plaintext how different tables were created and also every data in database. We can also use SQLite3’s own software (https://www.sqlite.org/download.html) and open database with command “.open database.db”. Now if we type “SELECT name,password FROM user;” we get a list of usernames and passwords.
Repairing flaws:
SQL injection (A1)
To prevent SQL injection we need to modify index.js and users.js in routes folder. Instead of inputting values directly into SQL command we need to use parameters. For example use prepare()-method from sqlite3 which allows us to use parameters for input.
Broken authentication and Session management (A2)
By repairing Insecure Direct Object References and Sensitive Data Exposure we also repair Broken authentication and Session management. Assuming that we won’t create visible session ids in URL:
Cross-site Scripting (A3)
Because this project uses Handlebars.js we just have to change every {{{[text]}}} into {{[text]}} in users.hbs and index.hbs in views folder. This will Handlebars will escape any values and any javascript will not be executed.
Insecure Direct Object References (A4)
To fix this we need to change our server little bit. Instead of using user ids in URL we should be using sessions and cookies. With this any important information shouldn’t be visible for others in URL.

Sensitive Data Exposure (A6)
Firstly, we should delete that comment in html which tells where database is located. Also a good way to protect sensitive data would be to use external database and use password. SQLite is easy to use database, that doesn’t require hosting, but it is not a safe. Even with hashing.
