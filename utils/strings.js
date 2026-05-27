const strings = {};

// General Errors
strings.ERROR_CREATING_CONTACT = "Error creating contact";
strings.ERROR_UPDATING_USER = "Error updating user";
strings.ERROR_UPDATING_TEAM = "Error updating team";
strings.ERROR_CREATING_CATEGORY = "Error creating category";
strings.ERROR_CREATING_TEAM = "Error creating team";
strings.USER_NOT_FOUND = "User not found";
strings.USER_NOT_MEMBER = "This user is not member of this team";
strings.TEAM_NOT_FOUND = "Team not found";
strings.CATEGORY_NOT_FOUND = "Category not found";
strings.EMAIL_EXISTS = "A user with this email address already exists";
strings.ERROR_CREATING_USER = "Error creating user";
strings.ERROR_ADDING_USER = "Error adding user";
strings.ERROR_GETTING_USER = "Error getting user";
strings.ERROR_REMOVING_USER = "Error removing user from this team";
strings.USER_CREATED = "User created successfully";
strings.USER_ADDED = "User added successfully";
strings.LONG_NAME_CATEGORY = "Try a shorter name max: 40 characters ";
strings.GET_CATEGORIES_ERROR = "Error getting categories";
strings.ERROR_OWN_GROUP = "You are member of this team";
strings.ALREADY_MEMBER = "This user is member of this team";

// Validation Messages
strings.NAME_NOT_EMPTY = "Name is required";
strings.LASTNAME_NOT_EMPTY = "Last name is required";
strings.COLOR_NOT_EMPTY = "Favorite color is required";
strings.EMAIL_NOT_EMPTY = "Email is required";
strings.BIRTHDAY_NOT_EMPTY = "Birthday is required";
strings.PASSWORD_NOT_EMPTY = "Password is required"
strings.PASSWORD_SHORT = "Minimum password length is 5"
strings.CATEGORY_EXISTS = "Category name exists, try a different name"
strings.TEAM_EXISTS = "Team name exists, try a different name"
strings.UNAUTHORIZED = "Unauthorized: No token provided"
strings.ERROR_TEAM_OWNERSHIP = "This team does not belong to you or does not exists"

// Format Errors
strings.EMAIL_BAD_FORMAT = "Invalid email format";
strings.BAD_REQUEST = "Bad request";

// Success/Fail Messages
strings.USER_UPDATED = "User updated successfully";
strings.TEAM_UPDATED = "Team updated successfully";
strings.TEAM_DELETED = "Team deleted successfully";
strings.CONTACT_DELETED_FAIL = "Error deleting contact";
strings.CATEGORY_DELETED = "Category deleted successfully";
strings.USER_REMOVED = "User removed successfully";


module.exports = strings;