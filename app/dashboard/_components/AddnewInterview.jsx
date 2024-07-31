"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/AI'
import { LoaderCircle } from 'lucide-react'  
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import moment from 'moment'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import {useRouter} from 'next/navigation'

function AddnewInterview() {

    const [opendailog,setopendailog]=useState(false)
    const [jobPosition, setJobPosition] =useState();
    const [jobDesc, setJobDesc]=useState();
    const [jobExperience, setJobExperience]=useState();
    const [Resume, setResume]=useState();
    const [loading, setloading]=useState(false);
    const [jsonResponse, setjsonResponse]=useState([]);
    const {user}=useUser();
    const router=useRouter();

    const onsubmit=async (e)=>{
        setloading(true)
        e.preventDefault()
        console.log(jobDesc,jobExperience,jobPosition,Resume)

        const InputPrompt= `Generate a JSON object with: 7 difficult, industry-relevant interview questions and answers for a ${jobPosition} role considering the ${Resume} ; an ATS score (60-84) comparing the resume to the job description; at least 3 positives about the resume; and at least 3 suggested add-ons, based on this data: Job Description: ${jobDesc}, Resume: ${Resume}, Job Experience: ${jobExperience}, Job Position: ${jobPosition}. Format: {"interviewQuestions":[{"question":"Q1","answer":"A1"},{"question":"Q2","answer":"A2"}],"atsAnalysis":{"score":75,"positives":["P1","P2","P3"],"suggestedAddOns":["S1","S2","S3"]}}`
        const result=await chatSession.sendMessage(InputPrompt)
        const mockresponse=(result.response.text()).replace('```json',"").replace('```','')
        console.log(mockresponse)
        setjsonResponse(mockresponse)
        
        if(mockresponse){
            const resp=await db.insert(MockInterview)
            .values({
                    mockId: uuidv4(),
                    jsonMockResp:mockresponse,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    resume:Resume,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
            }).returning({mockId:MockInterview.mockId})

            console.log("inserted",resp)
            if(resp){
               setopendailog(false)
               router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
        }
            
        else{
            console.log("error")
        }
        setloading(false)
    }
    return (
        <div>
        <div className='p-10 border rounded-lg bg-secondary
        hover:scale-105 hover: shadow-md cursor-pointer transition-all' onClick={()=>setopendailog(true)}>
        <h2 className=' text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={opendailog}>
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about the Job</DialogTitle>
            <DialogDescription >
                <form onSubmit={onsubmit}> 
                <div>
                <h2>Add details about the job postion/role, year of experience, tech stack everything you know</h2>
                    <div className='mt-7 my-3'>
                            <label>Job Role/Job Position</label>
                            <Input placeholder="Ex. Full Stack Developer" required onChange={(event)=>{setJobPosition(event.target.value)}}/>
                            
                    </div>
                    <div className=' my-3'>
                        <label>Job Description/ Tech Stack (In Short)</label>
                        <Textarea placeholder="Ex. React, Nextjs, Nodejs, MySql etc"  required onChange={(event)=>{setJobDesc(event.target.value)}}/>
                    </div>
                    <div className=' my-3'>
                        <label>Paste your Resume Here</label>
                        <Textarea placeholder="Name: John Doe ..."  required onChange={(event)=>{setResume(event.target.value)}}/>
                    </div>
                    <div className=' my-3'>
                        <label>Years of experience</label>
                        <Input placeholder="Ex.5"  type="number"   required onChange={(event)=>setJobExperience(event.target.value)}/>
                    </div>
                    
                </div>
                <div className='flex justify-end gap-5 mt-8'>
                    <Button type="button" variant='ghost' onClick={()=>setopendailog(false)}>Cancel</Button>
                    <Button type="submit" className='bg-blue-600 hover:bg-blue-700' disabled={loading}>
                    {loading?
                        <>
                        <LoaderCircle className='animate-spin' />Generating Questions and resume review
                        </>: 'Start Interview'
                    }
                       </Button>
                </div>
                </form>
            </DialogDescription>
            
            </DialogHeader>
        </DialogContent>
        </Dialog>

        </div>
    )
    
}

export default AddnewInterview