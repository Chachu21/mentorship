export interface IUser {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  interests?: string;
  location?: {
    state?: string;
    city?: string;
    region?: string;
    zipCode?: number;
  };
  bank_account?: {
    bank_name?: string;
    account_holder_name?: string;
    account_no?: string;
  };
  level?: string;
  profileImage: {
    public_id: string;
    url: string;
  };
  is_approved?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  languages?: string[];
  skills?: string[];
  profess?: string;
  role?: string;
  bio?: string;
  goal?: string;
  professionalRole?: string;
  currentJob?: string;
  experiences?: {
    title?: string;
    company?: string;
    isCurrent: boolean;
    experienceDescription?: string;
    hasExperience: boolean;
  }[];
  educations?: {
    school?: string;
    degree?: string;
    field?: string;
    educationDescription?: string;
  }[];
  certification?: string;
  rate?: number;
  mentoringFee?: number;
  service?: string;
  isVerified?: boolean;
  verificationCode?: string;
  verificationCodeExpires?: Date;
}

export interface formData {
  level: string;
  goal: string;
  professionalRole: string;
  title: string;
  company: string;
  isCurrent: boolean;
  experienceDescription: string;
  hasExperience: boolean;
  school: string;
  degree: string;
  field: string;
  educationDescription: string;
  languages: string[];
  skills: string[];
  bio: string;
  profileImageUrl: string;
  profileImage: string;
  region: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface mentorshipType {
  title: string;
  skills: string[];
  description: string;
  goal: string;
  service: string;
  amount: number;
  duration: string;
  createdAt?: Date;
  _id?: string;
  createdBy?: IUser | string;
}
