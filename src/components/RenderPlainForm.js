function RenderPlainForm({ model }){
    return (
        <div className="survey-container mb-1 text-white">
            <h1 className="mb-1 text-white">Preview</h1>
            {model.fields.map((field, index) => field.type === "Textfield" || field.type === "number" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        <input type={field.type} />
                    </div>
                )
                : field.type === "Description" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        <textarea></textarea>
                    </div>
                )
                : field.type === "file" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        <input type="file" />
                    </div>
                )
                : field.type === "Singlechoice-MCQ" || field.type === "Multiplechoice-MCQ" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        { field.options.map((option, idx) => (
                            <div className="input inline" key={idx}>
                                <input type={field.type === "Singlechoice-MCQ" ? "radio" : "checkbox"} className="mr-1" name={field.title.replace(" ", "")} />
                                <label>{option}</label>
                            </div>
                        )) }
                    </div>
                )
                : <p key={index}>Unknown field type.</p>
            )}
            <button className="btn mt-1">submit</button>
        </div>
    )
}

export default RenderPlainForm