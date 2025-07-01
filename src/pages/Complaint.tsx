import React, { useEffect, useState } from 'react';
import { Upload, MapPin, AlertTriangle, CheckCircle, Clock, User } from 'lucide-react';
import { createAPost, getAllAdminEmails, getAllPosts, getUserDetails, getUserPosts } from '../axios/axios';
import localStorageService from '../manageLocalStorage/localStorage';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import emailJs from "@emailjs/browser"

interface Complaint {
  id: string;
  title: string;
  content: string;
  category: string;
  priorityLevel: 'low' | 'medium' | 'high' | 'urgent';
  status: boolean;
  image: string | null;
  address: string;
  location: { lat: number; lng: number }
  name: string;
  createDate: string;
}

const Complaint = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    submittedBy: '',
    address: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [complaints,setComplaints] = useState<Complaint[] | undefined>([]);
  const [admin,setAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useAppSelector(state=>state.auth.user);
  const categories = [
    'Infrastructure',
    'Maintenance',
    'Safety',
    'Utilities',
    'Transportation',
    'Environment',
    'Security',
    'Other'
  ];
  
  useEffect(()=>{
    if(activeTab == 'track'){
       if(admin){
       (async()=>{
         const posts = await getAllPosts();
           if(typeof posts == "object"){
             if(typeof posts.data == "object"){
                  setComplaints(posts.data);
             }
           }
          })();


       }
       else{
        (async()=>{
         const posts = await getUserPosts();
           if(typeof posts == "object"){
             if(typeof posts.data == "object"){
                  setComplaints(posts.data.data);
             }
           }
      })();
       }

          
    }
  },[activeTab,setAdmin])

  useEffect(()=>{

    if(user){
      if(user.role == "admin") setAdmin(true);
    }

  },[user])

  useEffect(()=>{
    const status = localStorageService.getData().status;
    if(status){
        (async()=>{
            const user = await getUserDetails();

            if(typeof user =="object"){
               if(user.data =="object"){
                   if(user.data.role){
                    if(user.data.role == "admin") setAdmin(true);
                   }
               }
            }

        })();
    }
    else{
        navigate("/login");
    }
  },[])
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);
          setLocationName(`Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
     
      const formDataToSend = new FormData();
      
     
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('priorityLevel', formData.priority);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('name', formData.submittedBy);

      
      
      if (location) {
        formDataToSend.append('location', JSON.stringify(location));
      } else {
        formDataToSend.append('location', JSON.stringify("null"));
        alert("invalid location");
        return;
      }
      
      // Add image if selected
      if (image) {
        formDataToSend.append('image', image);
      }
      else alert("image is needed for verification");

      // Send API request
     const response = await createAPost(formDataToSend);
     console.log(response);

      if(response){

        
              if (response.status ==200) {
                 if(formData.priority == "high" || formData.priority == "urgent"){
                  const emails = await getAllAdminEmails();
                  
                  console.log(emails);
                  if(typeof emails == "object"){
                    if(emails.data!=null && typeof emails.data != "string"){
                       
                      const adminEmails:string[] = emails.data;

                      if(adminEmails.length != 0){
                        const recipientEmails = Array.isArray(adminEmails) ? adminEmails.join(',') : adminEmails;

                             const templateParams = {
                             email: recipientEmails,
                             title:formData.title,
                              description:formData.description,
                              category:formData.category,
                              priority:formData.priority,
                              submittedBy:formData.submittedBy,
                              address: formData.submittedBy
                              };


                             emailJs
                              .send(import.meta.env.VITE_EMAILJS_SERVICE_ID,import.meta.env.VITE_EMAILJS_TEMPLATEE_ID, templateParams, {
                                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                              })
                              .then(
                                () => {
                                    alert('info sent to admins');
                                },
                                (error) => {
                                  console.error('Failed to send inquiry:', error);
                                  alert('Failed to info to admins.');
                                },
                              );
                      }

                     }
                  }
                 }
                alert("submitted successfully");
                
                setShowSuccess(true);
                
              
                setFormData({
                  title: '',
                  description: '',
                  category: '',
                  priority: 'medium',
                  submittedBy: '',
                  address: ''
                });
                setImage(null);
                setImagePreview(null);
                setLocation(null);
                setLocationName('');
        
                
                setTimeout(() => {
                  setShowSuccess(false);
                }, 5000);
              } else {
                console.error('Error submitting complaint');
                alert('Failed to submit complaint. Please try again.');
              }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case false: return 'bg-yellow-100 text-yellow-700';
      case true: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status:boolean) => {
    switch (status) {
      case false: return Clock;
      case true: return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Steel Plant Complaint System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Report issues, track progress, and help us maintain the highest standards in our facilities.
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-green-800 font-medium">Complaint Submitted Successfully!</h3>
              <p className="text-green-700 text-sm">Your complaint has been registered and will be reviewed by our team shortly.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'submit'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <AlertTriangle className="inline-block h-4 w-4 mr-2" />
            Submit Complaint
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'track'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Clock className="inline-block h-4 w-4 mr-2" />
            Track Complaints
          </button>
        </div>
      </div>

      {activeTab === 'submit' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Complaint Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief summary of the issue"
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <select
                    id="priority"
                    required
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide detailed information about the issue, when it occurred, and its impact"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Image *
                </label>
                <p className='text-rose-800 text-[0.7rem] leading-[1.2rem]'>
                  ( wait a 10 s to load image after selecting image)
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-40 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-gray-500">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600">Upload an image to support your complaint</p>
                        <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Get Current Location</span>
                  </button>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter specific location (Building, Block, Room number, etc.)"
                  />
                </div>
              </div>

              {/* Address */}
               <div>
                 <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                   Address *
                 </label>
                 <input
                   type="text"
                   id="address"
                   required
                   value={formData.address}
                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   placeholder="Enter full address or landmark"
                 />
               </div>
               

              {/* Submitted By */}
              <div>
                <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="submittedBy"
                  required
                  value={formData.submittedBy}
                  onChange={(e) => setFormData({...formData, submittedBy: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5" />
                    <span>Submit Complaint</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'track' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Complaints</h2>
            <p className="text-gray-600">Track the progress of submitted complaints</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complaints?.map((complaint) => {
              const StatusIcon = getStatusIcon(complaint.status);
              return (
                <div key={complaint.id} onClick={()=>navigate(`/complaint-detail/${complaint.id}`)} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-mono text-gray-500">#{complaint.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priorityLevel)}`}>
                          {complaint.priorityLevel.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{complaint.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{complaint.content}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(complaint.status)}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{(complaint.status?"closed":"pending").toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{complaint.address}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{complaint.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Submitted: {new Date(complaint.createDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {complaint.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaint;