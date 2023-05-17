import { useState} from 'react'
import { Link } from 'react-router-dom'

import { getDateFromMillis } from '../utils'
import { deleteForm } from "../db"

import Fill from '../pages/Fill'
function FormCard({ form, onDelete }){
    const [preview, setPreview] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if(!window.confirm("Are you sure you want to delete this Survey?")) return
        setLoading(true)
        await deleteForm(form.id)
        setLoading(false)
        onDelete(form.id)
    }

    return (
        <div className="card">
            <h2 className="title mb-1">
                <span className='text-white'>{form.title}</span>
                <span className="card-date">{getDateFromMillis(form.createdAt)}</span>
            </h2>
            <a href={`${window.location.origin}/fill/${form.id}`} rel="noreferrer" className="link mb-1" target="_blank">{`${window.location.origin}/fill/${form.id}`}</a>
            <p className="card-nav">
                <span className="nav-item" onClick={() => setPreview(true)}>preview</span>
                <Link to={"/submissions/" + form.id} className="nav-item">submissions</Link>
                <span className="nav-item" onClick={handleDelete}>{ loading ? <span className="spinner red"></span> : <span>delete</span>}</span>
                <Link to={"/edit" + form.id} className="nav-item">edit</Link>
            </p>
            {preview && (
                <div className="modal">
                    <div className="modal-content preview">
                        <span className="close" onClick={() => setPreview(false)}>&times;</span>
                        <Fill/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormCard
