import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const DepartmentsPage = () => {
    const {departments} = useGlobalContext();

    const [departmentName, setDepartmentName] = useState<string | undefined>('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedDepId, setSelectedDepId] = useState(0)

    const sortedDepartments = departments.sort((a,b) => a.dep_id - b.dep_id);

    const handleCancel = () => {
        setIsUpdate(false);
        setDepartmentName('')
    }

    const addDepartment = async () => {
        const data = {
            dep_name: departmentName
        }
        try {
            const response = await fetch('http://localhost:3000/departments', 
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
    
            if (response.ok) {
                toast.success('Department Added')
            } else {
                toast.error('There is a error adding department')
            }
        } catch (error) {
            console.log(error)
        }

        setDepartmentName('')
    }

    const handleDelete = async (id: number) => {
        const Response = await fetch(`http://localhost:3000/departments/${id}`, {
            method: 'DELETE'
          });
    
          if (Response.ok) {
            toast.success('Department has been deleted')
          } else {
            toast.error('there is a problem deleting Department')
          }
    }
    
    const updateDepartment = (id: number) => {
        setIsUpdate(true)
        setSelectedDepId(id)
        const selectedDepartment = departments.find(dep => dep.dep_id === id);
        setDepartmentName(selectedDepartment?.dep_name);
    }

    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:3000/departments/${selectedDepId}`, 
            {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({dep_name: departmentName})
            }
        );

        if (response.ok) {
            toast.success('Department Updated')
        } else {
            toast.error('There is a error updating department')
        }

        setIsUpdate(false)
    }
  return (
    <section className="pt-[5rem] w-[86%] mx-auto flex justify-between">
      <div className="w-[500px] h-auto flex flex-col bg-slate-100 shadow-md">
      <div className="bg-slate-300 grid grid-cols-6 py-1 border-b">
            <div className="col-start-1 col-end-2 pl-4">ID</div>
            <div className="col-start-2 col-end-5 pl-4">Department Name</div>
            <div className="col-start-5 -col-end-1 pl-4">Action</div>
        </div>
        {
            sortedDepartments.map(dep => (
                <div key={dep.dep_id} className="grid grid-cols-6 py-1 border-b">
                    <div className="col-start-1 col-end-2 pl-4">{dep.dep_id}</div>
                    <div className="col-start-2 col-end-5 pl-4">{dep.dep_name}</div>
                    <div className="col-start-5 -col-end-1 pl-4 flex gap-6">
                        <button onClick={() =>updateDepartment(dep.dep_id)} className="bg-blue-600 text-white text-2xl p-1 rounded-full flex justify-center items-center">
                            <CiEdit/>
                        </button>
                        <button onClick={()=> handleDelete(dep.dep_id)} className="bg-red-600 text-white text-2xl p-1 rounded-full flex justify-center items-center">
                            <MdDeleteOutline/>
                        </button>
                    </div>
                </div>
            ))
        }
        
      </div>

      <div className="w-[300px] flex flex-col gap-4">
        <form className="flex flex-col gap-4">
            <label className="font-bold">Department Name</label>
            <input type="text"
                    value={departmentName} 
                    onChange={(e) => setDepartmentName(e.target.value)}
                    className="h-[3rem] w-full border pl-4 outline-none"/>
            {isUpdate? <button onClick={handleUpdate} className="w-full bg-black text-white py-2 rounded-md">Update Department</button> : 
                        <button onClick={addDepartment} className="w-full bg-black text-white py-2 rounded-md">Add Department</button>}
            {isUpdate? <button onClick={handleCancel} className="w-full bg-red-600 text-white py-2 rounded-md">Cancel</button>: null}
        </form>
      </div>
    </section>
  )
}

export default DepartmentsPage
