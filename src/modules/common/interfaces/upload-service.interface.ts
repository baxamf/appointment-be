import { FileUpload } from 'graphql-upload-minimal';

export interface UploadServiceInterface {
  uploadImages: (...images: Promise<FileUpload>[]) => Promise<string[]>;
  removeImages: (...images: string[]) => void;
}
