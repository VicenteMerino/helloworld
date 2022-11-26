import { Document } from 'mongoose';

interface Education extends Document {
  id?: string;
  school: string;
  degree: string;
  grade: string;
  from: string;
  to: string;
  description: string;
}

export default Education;
