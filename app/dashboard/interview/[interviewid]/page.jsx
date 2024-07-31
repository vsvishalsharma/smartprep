"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { WebcamIcon, LoaderCircle ,Lightbulb} from 'lucide-react'
import { Button } from '@/components/ui/button'

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewid)
    GetInterviewDetails();
  }, [params])

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewid))
      console.log(result);
      setInterviewData(result[0])
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  }

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  return (
    <div className='my-10 '>
      <div className='flex justify-center items-center'>
        <h2 className='font-bold text-2xl mb-5'>Let's Get Started</h2>
      </div>
      <div className='flex flex-col lg:flex-row lg:w-full lg:justify-center'>
        <div className='lg:w-1/2 flex flex-col items-start px-4 lg:px-8'>
          <div className='flex flex-col my-5 gap-3 p-5 border rounded-lg shadow-sm'>
            <h2 className='text-lg'><strong>Job Role: </strong>{interviewData ? interviewData.jobPosition : <><LoaderCircle className='animate-spin' /></>}</h2>
            <h2 className='text-lg'><strong>Job Description: </strong>{interviewData ? truncateString(interviewData.jobDesc, 100) : <><LoaderCircle className='animate-spin' /></>}</h2>
            <h2 className='text-lg'><strong>Job Experience: </strong>{interviewData ? interviewData.jobExperience : <><LoaderCircle className='animate-spin' /></>}</h2>
          </div>
          <div className='p-5 rounded-lg border border-yellow-500 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-600'> <Lightbulb/><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-600'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
        </div>
        <div className='lg:w-1/2 flex flex-col items-center px-4 lg:px'>
          {webcamEnabled ? (
            <>
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                style={{
                  height: 300,
                  width: 300
                }}  
                mirrored={true}
              />
              <Button onClick={() => setWebcamEnabled(false)} className="hover:bg-blue-500 mt-3 hover:text-white w-full border shadow-md" variant="ghost">
                Disable WebCam and Microphone
              </Button>
            </>
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'></WebcamIcon>
              <Button onClick={() => setWebcamEnabled(true)} className="hover:bg-blue-500 mt-3 hover:text-white w-full border shadow-md" variant="ghost">
                Enable WebCam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='flex items-end justify-end my-4'>
        <Button className='bg-blue-500'>Start Interview</Button>
      </div>
    </div>
  )
}

export default Interview
