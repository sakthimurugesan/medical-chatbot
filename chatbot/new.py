import re

# Function to validate email using regex
def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@skcet\.ac\.in$'  # Matches email ending with @skcet.ac.in
    if re.match(pattern, email):
        return True
    return False
d=9876543210
# Function to validate Indian mobile number using regex
def validate_mobile(mobile):
    pattern = r'^[6789]\d{9}$'  # Matches a 10-digit number starting with 7, 8, or 9
    if re.match(pattern, mobile):
        return True
    return False

# Function to validate Indian pincode using regex
def validate_pincode(pincode):
    pattern = r'^\d{6}$'  # Matches exactly 6 digits
    if re.match(pattern, pincode):
        return True
    return False

# Input validation
def validate_user_details(email, mobile, pincode):
    email_valid = validate_email(email)
    mobile_valid = validate_mobile(mobile)
    pincode_valid = validate_pincode(pincode)
    
    return email_valid, mobile_valid, pincode_valid

# Test the program
email = input("Enter email: ")
mobile = input("Enter mobile number: ")
pincode = input("Enter pincode: ")

email_valid, mobile_valid, pincode_valid = validate_user_details(email, mobile, pincode)

if email_valid:
    print("Email is valid.")
else:
    print("Invalid email. Email should end with @skcet.ac.in.")

if mobile_valid:
    print("Mobile number is valid.")
else:
    print("Invalid mobile number. It should be 10 digits long, starting with 7, 8, or 9.")

if pincode_valid:
    print("Pincode is valid.")
else:
    print("Invalid pincode. It should be 6 digits long.")
