import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import AddFieldModal from "../components/AddFieldModal"
import RenderPlainForm from "../components/RenderPlainForm"

import { updateObjState } from "../utils"

import { createForm as saveForm } from "../db"

function Create(){
    const [showAddModal, setShowAddModal] = useState(false)
    const [inputType, setInputType] = useState("text")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const openAddModal = inputType => {
        setShowAddModal(true)
        setInputType(inputType)
    }

    const [formModel, setFormModel] = useState({
        title: "",
        createdAt: +(new Date()),
        fields: [
            {
                title: "Enter your email",
                type: "Textfield",
                required: true
            }
        ],
        endMessage: "",
        expiration: ""
    })

    const addFieldToFormModel = field => {
        let _model = Object.assign({}, formModel)
        _model.fields.push(field)
        setFormModel(_model)
    }
    const removeFeildFormModel=key=>{
        let _model = Object.assign({}, formModel)
        const part=_model.fields.splice(0,key)
        const spart=_model.fields.splice(key+1)
        _model.fields=[...part , ...spart];
        setFormModel(_model)
    }

    const inputTypes = ["Textfield", "Description", "number", "Singlechoice-MCQ", "Multiplechoice-MCQ", "file"]

    const createForm = async () => {
        if(loading) return
        setErr("")

        if(!formModel.title.trim()) return setErr("Title is required")
        if(formModel.title.trim().length < 5 || formModel.title.trim().length > 50) return setErr("Title should be 5 - 50 characters long")

        if(formModel.expiration.trim() && formModel.expiration < 1) return setErr("Validity should be at least an hour")

        if(formModel.fields.length < 2) return setErr("You need to add at least one field")

        setLoading(true)
        try{
            await saveForm(formModel)
            setLoading(false)
            navigate("/forms")
        }catch(e){
            setErr(e.message)
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="heading">Create New Survey</h1>
            
            <div className="form sign-up-form">
                <div className="input">
                    <label>Title</label>
                    <input type="text" placeholder="What is the survey about" onChange={e => updateObjState(setFormModel, formModel ,"title", e.target.value)} />
                </div>

                {formModel.fields.length > 0 && <RenderPlainForm model={formModel} remove={removeFeildFormModel} />}

                <div className="input">
                    <label>ThankYou note</label>
                    <input type="text" placeholder="User will see this after submit" onChange={e => updateObjState(setFormModel, formModel ,"endMessage", e.target.value)} />
                </div>

                <div className="input">
                    <label>Survey period</label>
                    <input type="number" placeholder="Time duration of survey in hours" onKeyDown={e => {if(e.key==='.' || e.key==='-'){e.preventDefault()}}} onChange={e => updateObjState(setFormModel, formModel ,"expiration", e.target.value)} />
                </div>
            </div>

            <p className="mb-2 text-right">
                { err && <p className="err text-right mb-1">{err}</p> }
                <button className="btn" onClick={createForm}>{ loading ? <span className="spinner white"></span> : <span>Add</span>}</button>
            </p>
            
            <div className="add-field-container">
                <p>Add new field</p>
                { inputTypes.map((inputType, index) => <button className="btn" key={index} onClick={() => openAddModal(inputType)}>{inputType.replace("-", " ")}</button>)}
            </div>
            
            { showAddModal && <AddFieldModal inputType={inputType}  close={() => setShowAddModal(false)} add={addFieldToFormModel} /> }
        </div>
    )
}

export default Create