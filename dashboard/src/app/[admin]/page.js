'use client'
import React from 'react'
import { where, query,collection } from '@firebase/firestore'
import { doc, getDoc, getDocs } from '@firebase/firestore'
import { db } from '@/firebase/config'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import StudentTable from '@/components/studentTable'
import { Skeleton } from "@/components/ui/skeleton"

const Dashboard = () => {

  const id = useParams()

  const [admin, setAdmin] = useState("")
  const [students, setStudents] = useState([])
  const [fetching, setFetching] = useState(false)

  if(fetching)
    console.log(students)

  //read
  useEffect(() => {
    const read = async () => {
      
      const docRef = doc(db, "admin", id.admin);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await setAdmin(docSnap.data().name)
        // console.log(admin)
        const q = query(collection(db, "students"), where("institute", "==", admin));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          setStudents((students) => [...students, doc.data()])
          // console.log(doc.id, " => ", doc.data());
        });
        setFetching(true)

      } else {
        console.log("No such document!");
      }
  }
    read()
  }, [admin])



  return (
    <main className="flex flex-col items-center justify-between p-5 overflow-y-hidden">
        <div className="flex flex-col items-center justify-center w-full  overflow-y-scroll">
          <div className="absolute z-10 right-10 top-32 w-3/4 h-5/6 overflow-y-scroll bg-white rounded-3xl p-5 shadow-xl ">
            {fetching &&
                <StudentTable data={students} />
            }
            {!fetching &&
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div> 

            }
            </div>
            <img src='/Rectangle.png' className="w-[85%] absolute right-0 top-[10%] blur-md"/>
        </div>
    </main>
  )
}

export default Dashboard