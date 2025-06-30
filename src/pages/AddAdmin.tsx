import React, { useState } from 'react';
import { Mail, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { addAdmin } from '../axios/axios';

const AddAdmin = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
      
      if (!email) {

        setErrorMessage("email is required");
        setIsSubmitting(false);
        setShowError(true);
        return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("email is inavlid");
        setIsSubmitting(false);
        setShowError(true);
        return;
    }

   

    try{
    const response = await addAdmin(email);

    if(typeof response =="object"){
        if(typeof response.data == "object"){
            setShowSuccess(true);
        }
        else{
            setErrorMessage("user already exists or it may be network issue try later");  
            setShowError(true);  
        }
        setIsSubmitting(false);
    }
     setTimeout(() => {
        setShowError(false);
        setShowSuccess(false);
      }, 5000);
    }
    catch (error) {
      setShowError(true);
      setErrorMessage('Failed to add admin. Please check the email and try again.');
      setIsSubmitting(false);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }

    setEmail("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Add New Admin
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Add a new administrator to the Steel Plant Complaint System by entering their email address.
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-green-800 font-medium">Admin Added Successfully!</h3>
              <p className="text-green-700 text-sm">The new administrator has been added to the system ,Register account with provided email</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-red-800 font-medium">Error Adding Admin</h3>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Administrator Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter admin email address"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Adding Admin...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Add Admin</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;