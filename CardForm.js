import React from "react"
import "./App.css"

export const CardForm = ({ formSubmit, hideForm, defaultStatus, defaultUserName, defaultDescription }) => (
    <form onSubmit={formSubmit}>
        <div className="form-group col-md-6">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" defaultValue={defaultUserName}
                className="form-control" placeholder="add username..." required />
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="status">Status</label>
            <input type="text" name="status" defaultValue={defaultStatus}
                className="form-control" placeholder="add status..." required />
        </div>
        <div className="form-group col-md-12">
            <label htmlFor="description">Description</label>
            <textarea type="text" name="description" defaultValue={defaultDescription} className="form-control"
                placeholder="add description..." required />
        </div>
        <button className="btn btn-sm btn-primary" type="submit" style={{ marginRight:"2px" }}>
            <i className="fa fa-check"></i> Add
        </button>
        <button className="btn btn-sm btn-default" onClick={hideForm}><i className="fa fa-close"></i> Close</button>
    </form>
)
CardForm.propTypes = {
    formSubmit : React.PropTypes.func,
    hideForm: React.PropTypes.func,
    defaultStatus: React.PropTypes.string,
    defaultUserName: React.PropTypes.string,
    defaultDescription: React.PropTypes.string
}
export default CardForm
