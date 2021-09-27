1- Users(user , superAdmin ,Admin)
• Signup ( username , email , password , cPassword , phone , location , role default: user) validation joi
Hash password and encrypt phone number
• Signin (email ,password) Joi validation (compare password , generate token)
• Update profile with Joi validation ( must be login first and have valid token)
• Update password (old password , newPassword , cNewPassword) Joi validation
2- Posts
• Create Post (title , desc , createdBy => ref :User) Joi validation
• edit post Joi validation
• delete post Joi validation
• user get profile post
• user view news feed( all users post) for users whose account not deactivate or post blocked by admin
• user can report other post every post only one time for each post ( userID , postID , reportComment) Joi validation
• user can deactivate his account
• view advertising
3- Admin(inserted manual first time in DB with role superAdmin)
• Get users List
• Add other admin with role admin ( super Admin only)
• Get admin list (superAdmin only)
• Delete admin(superAdmin only)
Admin and superAdmin can
• CRUD advertising (title , desc ) Joi
• View all post
• Review report and take action to block post or not
• Block user

• \*important note all data must run under validation using Joi ( body , param , query)
Must user be signing and have token to do any of this based on his role
