# Admin registration small seed script
connect to MongoDB
        ↓
take initial password
        ↓
bcrypt.hash()
        ↓
create Admin document
        ↓
save passwordHash in MongoDB

* A developer tool
* Not an API endpoint
* Not something public users can access

