import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Tag,
  FileText,
  Image as ImageIcon,
  Phone,
  Mail,
  LucideIcon
} from 'lucide-react';
import { getPostById, getUserDetails, updateStatusByAdmin } from '../axios/axios';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authLogin } from '../store/authStore';

interface Complaint {
  id: string;
  title: string;
  content: string;
  category: string;
  priorityLevel: 'low' | 'medium' | 'high' | 'urgent';
  status: boolean;
  imageUrl: string | null;
  address: string;
  location: { lat: number; lng: number };
  name: string;
  createDate: string;
}

interface statusinfo{
    icon: LucideIcon;
    label: string;
    color: string;
    bg: string;
    border: string;
}

const ComplaintDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [statusInfo,setStatusInfo] = useState<statusinfo>(
    {
        icon: CheckCircle,
        label: 'Resolved',
        color: 'text-green-600',
        bg: 'bg-green-100',
        border: 'border-green-200'
      }
  );
  const [submitStatus,setSubmitStatus] = useState<boolean>(false);
//   useEffect(() => {
//     // Get complaint data from navigation state
//     if (location.state?.complaint) {
//       setComplaint(location.state.complaint);
//     } else {
//       // If no state data, you could fetch the complaint by ID here
//       // For now, redirect back to complaints list
//       navigate('/complaints');
//     }
//   }, [location.state, navigate]);
const dispatch = useAppDispatch();
const user = useAppSelector(state=>state.auth.user);

  useEffect(()=>{
       if(id){
          (async()=>{
             try {
                const response = await getPostById(id);
                console.log(response?.data);
                if(typeof response == "object"){
                    if(typeof response.data == "object"){
                        setComplaint(response.data);
                    }
                }
             } catch (error) {
                if(error instanceof Error) alert(error.message);
                
             }
          })();
       }
  },[id])

  useEffect(()=>{
       if(complaint){
         setStatusInfo( getStatusInfo(complaint.status));
         setSubmitStatus(complaint.status);
       }
  },[complaint])

   useEffect(()=>{
      (async()=>{
        const userDetails = await getUserDetails();
         
        if(userDetails){
          if(userDetails.data) dispatch(authLogin(userDetails.data));
        }
      })();
    },[])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': 
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          border: 'border-green-200'
        };
      case 'medium': 
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          border: 'border-yellow-200'
        };
      case 'high': 
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-700',
          border: 'border-orange-200'
        };
      case 'urgent': 
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          border: 'border-red-200'
        };
      default: 
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          border: 'border-gray-200'
        };
    }
  };

  const getStatusInfo = (status: boolean) => {
    if (status) {
      return {
        icon: CheckCircle,
        label: 'Resolved',
        color: 'text-green-600',
        bg: 'bg-green-100',
        border: 'border-green-200'
      };
    } else {
      return {
        icon: Clock,
        label: 'Pending',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        border: 'border-yellow-200'
      };
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleUpdateStatus=async()=>{
      try {
       if(complaint?.id){
          const response = await updateStatusByAdmin(complaint.id);
          if( typeof response == "object"){
            if(typeof response.data == "object"){
                 setStatusInfo(getStatusInfo(true));
                 setSubmitStatus(false);
                alert(response.data.message);
                navigate("/complaint")
                return;
            }
          }
       }
        
      } catch (error) {
         if( error instanceof Error) alert(error.message);
      }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const priorityColors = getPriorityColor(complaint.priorityLevel);
  const formattedDate = formatDate(complaint.createDate);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Complaint Details
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-mono text-gray-500">
                #{complaint.id}
              </span>
              <div className={`px-3 py-1 rounded-full border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.color} flex items-center space-x-2`}>
                <StatusIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{statusInfo.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Priority */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex-1 mr-4">
                  {complaint.title}
                </h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border} flex items-center space-x-2`}>
                  <AlertTriangle className="h-4 w-4" />
                  <span>{complaint.priorityLevel.toUpperCase()} PRIORITY</span>
                </div>
              </div>
              
              {/* Category */}
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {complaint.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {complaint.content}
                </p>
              </div>
            </div>

            {/* Supporting Image */}
            {complaint.imageUrl && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <ImageIcon className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Supporting Image</h3>
                </div>
                <div className="relative">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                  {imageError ? (
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Unable to load image</p>
                    </div>
                  ) : (
                    <img
                      src={complaint.imageUrl}
                      alt="Complaint supporting evidence"
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      style={{ display: imageLoading ? 'none' : 'block' }}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Location Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900">{complaint.address}</p>
                </div>
                {complaint.location && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Coordinates</p>
                    <p className="text-gray-900 font-mono text-sm">
                      Lat: {complaint.location.lat.toFixed(6)}, 
                      Lng: {complaint.location.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Submitted by</p>
                    <p className="text-gray-900 font-medium">{complaint.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-gray-900">{formattedDate.date}</p>
                    <p className="text-sm text-gray-600">{formattedDate.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span>{statusInfo.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Alert */}
            {complaint.priorityLevel === 'urgent' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h4 className="text-red-800 font-medium">Urgent Priority</h4>
                </div>
                <p className="text-red-700 text-sm">
                  This complaint has been marked as urgent and requires immediate attention.
                </p>
              </div>
            )}

            {/* Action Buttons (for admin users) */}
             {
                user?(
                    user.role =="admin" && !submitStatus&& (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-3">
                              <button  onClick={handleUpdateStatus} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Update Status
                              </button>
                             
                            </div>
                         </div>
                    )
                ):null
             }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;