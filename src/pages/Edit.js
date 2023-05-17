import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import AddFieldModal from "../components/AddFieldModal"
import RenderPlainForm from "../components/RenderPlainForm"
import { updateObjState } from "../utils"
import { getForm , editForm as saveForm} from "../db"
export default function Edit(){
    
    const [showAddModal, setShowAddModal] = useState(false)
    const [inputType, setInputType] = useState("text")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const [formModel, setFormModel]=useState({})

    const navigate = useNavigate()
    const openAddModal = inputType => {
        setShowAddModal(true)
        setInputType(inputType)
    }

    const { id }= useParams()
    useEffect(() => {
        if(!localStorage.getItem('gfc-user')) return
        const fetchData = async () => {
            try{
                let frms = await getForm({ id })
                setFormModel(frms)
                setLoading(false)
            }catch(e){
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const addFieldToFormModel = field => {
        let _model = Object.assign({}, formModel)
        _model.fields.push(field)
        setFormModel(_model)
    }

    const removeFormField=index=>{
        let _model = Object.assign({}, formModel)
        _model.fields.splice(index , 1)
        setFormModel(_model)

    }

    const inputTypes = ["Textfield", "Description", "number", "Singlechoice-MCQ", "Multiplechoice-MCQ", "file"]

    const editForm=async()=>{
        if(loading) return
        setErr("")

        if(!formModel.title.trim()) return setErr("Title is required")
        if(formModel.title.trim().length < 5 || formModel.title.trim().length > 50) return setErr("Title should be 5 - 50 characters long")

        if(formModel.expiration.trim() && formModel.expiration < 1) return setErr("Validity should be at least an hour")

        if(formModel.fields.length < 1) return setErr("You need to add at least one field")
        setLoading(true)
        try{
            await saveForm(formModel, id)
            setLoading(false)
            navigate("/forms")
        }catch(e){
            setErr(e.message)
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="heading">Edit Survey</h1>
            
            <div className="form sign-up-form">
                <div className="input">
                    <label>Title</label>
                    <input type="text" placeholder="What is the survey about" onChange={e => updateObjState(setFormModel, formModel ,"title", e.target.value)} />
                </div>

                {formModel.fields.length > 0 && <RenderPlainForm model={formModel} remove={removeFormField} />}

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
                <button className="btn" onClick={editForm}>{ loading ? <span className="spinner white"></span> : <span>Add</span>}</button>
            </p>
            
            <div className="add-field-container">
                <p>Add new field</p>
                { inputTypes.map((inputType, index) => <button className="btn" key={index} onClick={() => openAddModal(inputType)}>{inputType.replace("-", " ")}</button>)}
            </div>
            
            { showAddModal && <AddFieldModal inputType={inputType}  close={() => setShowAddModal(false)} add={addFieldToFormModel} /> }
        </div>
    )
}