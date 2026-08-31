# bcrypt
Protects the password.
Answers: "Is this password correct?"

# JWT
Protects future admin requests. 
After successfully proving their identity once,
the admin gets a signed token they can send with
later create/edit/delete requests.
Answers: "Has this request already been authenticated?"

# Authentication
Answers: "Who are you ?"

# Authorization
Answers: "What are you allowed to do?"