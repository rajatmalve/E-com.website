import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Calendar, Camera, Briefcase } from 'lucide-react';

export default function ProfilePage() {
  const { isAuthenticated, user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    addresses: user?.addresses || [
      {
        id: 1,
        label: 'Home',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        isDefault: true
      }
    ],
    avatar: user?.avatar || null,
    alternateMobile: user?.alternateMobile || '',
    occupation: user?.occupation || '',
    companyName: user?.companyName || '',
    designation: user?.designation || ''
  });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated || !user) return <Navigate to="/" replace />;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('addresses[')) {
      const match = name.match(/addresses\[(\d+)\]\.(.+)/);
      if (match) {
        const [_, index, field] = match;
        setFormData(prev => ({
          ...prev,
          addresses: prev.addresses.map((addr, i) => {
            if (i === parseInt(index)) {
              return { ...addr, [field]: value };
            }
            return addr;
          })
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          id: Date.now(),
          label: '',
          street: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India',
          isDefault: false
        }
      ]
    }));
  };

  const handleRemoveAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleSetDefaultAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index
      }))
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setMsg({ text: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false);
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch (error) {
      setMsg({ text: 'Failed to update profile. Please try again.', type: 'error' });
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 
    'West Bengal'
  ];

  const getInputClassName = (isDisabled) => {
    return 'w-full px-4 py-2 rounded-lg border ' + 
      (isDisabled ? 'border-transparent bg-gray-50' : 'border-gray-300') + 
      ' focus:outline-none focus:ring-2 focus:ring-blue-500';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={'px-4 py-2 rounded-lg ' + 
            (isEditing 
              ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700') +
            ' transition-colors duration-200'}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-4 text-gray-400" />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-gray-500">{formData.email}</p>
              {formData.designation && formData.companyName && (
                <p className="text-gray-500">{formData.designation} at {formData.companyName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={getInputClassName(!isEditing)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={getInputClassName(!isEditing)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-transparent bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="+91 "
                className={getInputClassName(!isEditing)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
              <input
                type="tel"
                name="alternateMobile"
                value={formData.alternateMobile}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="+91 "
                className={getInputClassName(!isEditing)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={getInputClassName(!isEditing)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={getInputClassName(!isEditing)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={getInputClassName(!isEditing)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={getInputClassName(!isEditing)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={getInputClassName(!isEditing)}
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Address Information
            </h2>
            {isEditing && (
              <button
                type="button"
                onClick={handleAddAddress}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Add New Address
              </button>
            )}
          </div>
          
          <div className="space-y-8">
            {formData.addresses.map((address, index) => (
              <div key={address.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <select
                      name={`addresses[${index}].label`}
                      value={address.label}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={getInputClassName(!isEditing) + ' w-auto'}
                    >
                      <option value="">Select Label</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                    {address.isDefault && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex items-center space-x-2">
                      {!address.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefaultAddress(index)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Set as Default
                        </button>
                      )}
                      {formData.addresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAddress(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      name={`addresses[${index}].street`}
                      value={address.street}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={getInputClassName(!isEditing)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name={`addresses[${index}].city`}
                      value={address.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={getInputClassName(!isEditing)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                      name={`addresses[${index}].state`}
                      value={address.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={getInputClassName(!isEditing)}
                    >
                      <option value="">Select State</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      name={`addresses[${index}].pincode`}
                      value={address.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={getInputClassName(!isEditing)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name={`addresses[${index}].country`}
                      value={address.country}
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-transparent bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Success/Error Message */}
        {msg.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={'p-4 rounded-lg ' + 
              (msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}
          >
            {msg.text}
          </motion.div>
        )}
      </form>
    </div>
  );
}
