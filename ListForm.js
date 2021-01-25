import React, { Component } from "react"
import "./App.css"
import $ from "jquery"
import swal from "sweetalert"

export default class ListForm extends Component {
    static propTypes ={
        addList: React.PropTypes.func,
        canAdd: React.PropTypes.func
    }
    constructor (props) {
        super(props)
        this.state = {
            defaultValue : null
        }
    }
    formSubmit = (e) => {
        const { addList, canAdd } = this.props
        e.preventDefault()
        let data = $(e.target).serializeArray()
        let title
        data.map(inputs => {
            title = inputs.value
            return null
        })
        if (canAdd(title)) {
            addList(title)
        } else {
            swal({
                type: "error",
                title: `already a list with name ${title}`
            })
        }
        console.log(this.refs.form)
        this.refs.form.value = ""
    }
    render () {
        return (
            <form onSubmit={this.formSubmit}>
                <div className="form-group">
                    <input className="form-control" ref="form" type="text"
                        name="listName" defaultValue={null} placeholder="add the Title for new list" required />
                </div>
                <button type="submit" className="btn btn-success">
                    <span className="fa fa-plus"></span> Add a list
                </button>
            </form>
        )
    }
}
