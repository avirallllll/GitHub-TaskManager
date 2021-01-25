import React, { Component } from "react"
import "./App.css"
import $ from "jquery"
import CardForm from "./CardForm"

export default class AddCard extends Component {
    static propTypes = {
        addCard :React.PropTypes.func,
        selfHeading: React.PropTypes.string
    }
    constructor (props) {
        super(props)
        this.state = {
            showForm: true
        }
    }
    formSubmit = (e) => {
        let { addCard, selfHeading } = this.props
        e.preventDefault()
        let data = $(e.target).serializeArray()
        let objectToSend = {}
        data.map(input => {
            objectToSend[input.name] = input.value
        })
        addCard(selfHeading, objectToSend)
        this.hideForm()
    }
    showForm = () => {
        this.setState({
            showForm: true
        })
    }
    hideForm = () => {
        this.setState({
            showForm: false
        })
    }
    render () {
        let { showForm } = this.state
        return (
            <div className="addCard">
                {showForm
                    ? <CardForm formSubmit={this.formSubmit} hideForm={this.hideForm} />
                    : <button onClick={this.showForm} className="btn btn-primary">
                        <i className="fa fa-plus"></i> Add Card...
                    </button>}
            </div>
        )
    }
}
