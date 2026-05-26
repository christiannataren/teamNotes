const strings = {};

// General Errors
strings.ERROR_CREATING_CONTACT = "Error creating contact";
strings.USER_NOT_FOUND = "User not found";
strings.EMAIL_EXISTS = "A user with this email address already exists";
strings.ERROR_CREATING_USER = "Error creating user";
strings.ERROR_GETTING_USER = "Error getting user";
strings.USER_CREATED = "User created successfully";

// Validation Messages
strings.NAME_NOT_EMPTY = "Name is required";
strings.LASTNAME_NOT_EMPTY = "Last name is required";
strings.COLOR_NOT_EMPTY = "Favorite color is required";
strings.EMAIL_NOT_EMPTY = "Email is required";
strings.BIRTHDAY_NOT_EMPTY = "Birthday is required";
strings.PASSWORD_NOT_EMPTY = "Password is required"
strings.PASSWORD_SHORT = "Minimum password length is 5"

// Format Errors
strings.EMAIL_BAD_FORMAT = "Invalid email format";
strings.BIRTHDAY_BAD_FORMAT = "Date format must be YYYY-MM-DD";

// Success/Fail Messages
strings.CONTACT_UPDATED = "Contact updated successfully";
strings.CONTACT_FAIL_UPDATED = "Error updating contact";
strings.CONTACT_DELETED = "Contact deleted successfully";
strings.CONTACT_DELETED_FAIL = "Error deleting contact";


module.exports = strings;