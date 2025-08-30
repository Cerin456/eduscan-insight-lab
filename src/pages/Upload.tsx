import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload as UploadIcon,
  File,
  CheckCircle,
  AlertCircle,
  X,
  Eye
} from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  ocrText?: string;
}

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and OCR processing
    newFiles.forEach(uploadedFile => {
      simulateUpload(uploadedFile.id);
    });

    toast({
      title: "Files Added",
      description: `${acceptedFiles.length} file(s) added for processing.`,
    });
  }, [toast]);

  const simulateUpload = (fileId: string) => {
    const updateProgress = (progress: number, status?: UploadedFile['status']) => {
      setUploadedFiles(prev =>
        prev.map(file =>
          file.id === fileId
            ? { ...file, progress, ...(status && { status }) }
            : file
        )
      );
    };

    // Upload phase
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        clearInterval(uploadInterval);
        updateProgress(100, 'processing');
        
        // OCR processing phase
        setTimeout(() => {
          updateProgress(100, 'completed');
          setUploadedFiles(prev =>
            prev.map(file =>
              file.id === fileId
                ? {
                    ...file,
                    ocrText: `Sample OCR text extracted from ${file.file.name}:\n\nQuestion 1: What is the capital of France?\nAnswer: Paris\n\nQuestion 2: Calculate 2 + 2\nAnswer: 4\n\nOverall Score: 85/100`
                  }
                : file
            )
          );
        }, 2000);
      } else {
        updateProgress(progress);
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error" />;
      default:
        return <File className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing OCR...';
      case 'completed':
        return 'Ready for grading';
      case 'error':
        return 'Processing failed';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload Answer Sheets</h1>
        <p className="text-muted-foreground">
          Upload PDF or image files of student answer sheets for AI-powered evaluation
        </p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
              }`}
            >
              <input {...getInputProps()} />
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isDragActive ? 1.1 : 1 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <UploadIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground mb-2">
                    {isDragActive ? 'Drop files here' : 'Upload answer sheets'}
                  </p>
                  <p className="text-muted-foreground">
                    Drag and drop PDF or image files, or click to browse<br />
                    <span className="text-sm">Supported formats: PDF, PNG, JPG, JPEG (Max 10MB)</span>
                  </p>
                </div>
                <Button variant="outline">
                  Choose Files
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Instructions for Teachers</CardTitle>
            <CardDescription>
              Follow these guidelines for best OCR results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-success">✓ Best Practices</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Ensure clear, well-lit scans</li>
                  <li>• Use high resolution (300+ DPI)</li>
                  <li>• Keep pages flat and straight</li>
                  <li>• Remove shadows and glare</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-warning">⚠ Avoid</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Blurry or low-quality images</li>
                  <li>• Rotated or skewed pages</li>
                  <li>• Multiple pages in one file</li>
                  <li>• Handwriting that's too small</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Processing Files</CardTitle>
              <CardDescription>
                OCR scanning progress and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence>
                  {uploadedFiles.map((uploadedFile) => (
                    <motion.div
                      key={uploadedFile.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                    >
                      {getStatusIcon(uploadedFile.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getStatusText(uploadedFile.status)} • {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {uploadedFile.status !== 'completed' && (
                          <Progress
                            value={uploadedFile.progress}
                            className="w-full mt-2 h-2"
                          />
                        )}
                      </div>
                      <div className="flex gap-2">
                        {uploadedFile.status === 'completed' && uploadedFile.ocrText && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => {
                              toast({
                                title: "OCR Results",
                                description: uploadedFile.ocrText,
                              });
                            }}
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadedFile.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {uploadedFiles.some(file => file.status === 'completed') && (
                <div className="mt-6 pt-6 border-t">
                  <Button
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Proceeding to Grading",
                        description: "Moving to the auto-grading dashboard...",
                      });
                      // Navigation would happen here
                    }}
                  >
                    Proceed to Auto-Grading
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Upload;