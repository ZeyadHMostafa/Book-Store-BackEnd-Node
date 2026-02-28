const crypto = require('node:crypto');
const userModel = require('../models/user');
const {sendEmail} = require('../services/mailService');
const {ApiError} = require('../utils/apiError');

class AuthController {
  async forgotPassword(data) {
    const user = await userModel.findOne({email: data.email});
    if (!user) throw new ApiError(404, 'There is no user with this email address');

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');

    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false; // <-- add this field to your User model
    await user.save({validateBeforeSave: false});

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset code (valid for 10 min)',
        message: `Hi ${user.firstName},\n\nYour password reset code is: ${resetCode}\n\nValid for 10 minutes.`
      });
      return {status: 'success', message: 'Reset code sent to email'};
    } catch (err) {
      user.passwordResetCode = undefined;
      user.passwordResetExpires = undefined;
      user.passwordResetVerified = undefined;
      await user.save({validateBeforeSave: false});
      throw new ApiError(500, 'There was an error sending the email. Try again later.');
    }
  }

  // Step 2: verify the 6-digit code only
  async verifyResetCode(data) {
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(data.resetCode.toString())
      .digest('hex');

    const user = await userModel.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: {$gt: Date.now()}
    });

    if (!user) throw new ApiError(400, 'Reset code is invalid or has expired');

    user.passwordResetVerified = true;
    await user.save({validateBeforeSave: false});

    return {status: 'success', message: 'Code verified'};
  }

  // Step 3: set new password (only allowed after code is verified)
  async updatePassword(data) {
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(data.resetCode.toString())
      .digest('hex');

    const user = await userModel.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: {$gt: Date.now()},
      passwordResetVerified: true // must have passed step 2
    });

    if (!user) throw new ApiError(400, 'Session expired. Please restart the reset process.');

    user.password = data.password;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();

    return {status: 'success', message: 'Password updated successfully'};
  }
}

module.exports = new AuthController();
