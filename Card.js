import React, { Component } from "react"
import "./App.css"
import $ from "jquery"
import CardForm from "./CardForm"

export default class Card extends Component {
    static propTypes = {
        deleteCard: React.PropTypes.func,
        listHeading: React.PropTypes.string,
        index: React.PropTypes.number,
        editCard: React.PropTypes.func,
        transferToList: React.PropTypes.func,
        card: React.PropTypes.object,
        headings: React.PropTypes.array

    }
    constructor (props) {
        super(props)
        this.state = {
            showForm: false,
            showMoveCard: true
        }
    }
    deleteCardFromList = () => {
        const { deleteCard, listHeading, index } = this.props
        deleteCard(listHeading, index)
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
    showMoveCard = () => {
        this.setState({
            showMoveCard: true
        })
    }
    hideMoveCard = () => {
        this.setState({
            showMoveCard: false
        })
    }
    formSubmit = (e) => {
        const { editCard, index, listHeading } = this.props
        e.preventDefault()
        let data = $(e.target).serializeArray()
        let objectToSend = {}
        data.map(input => {
            objectToSend[input.name] = input.value
        })
        editCard(listHeading, objectToSend, index)
        this.hideForm()
    }
    moveToList = (e) => {
        let { transferToList, index, listHeading } = this.props
        e.preventDefault()
        let data = $(e.target).serializeArray()
        if (data[0]) {
            let toList = data[0].value
            transferToList(listHeading, index, toList)
        }
        this.hideMoveCard()
    }
    render () {
        let { card, headings, listHeading } = this.props
        const { showForm, showMoveCard } = this.state
        return (
            <div className="card">
                <span className="fa fa-close pull-right"
                    onClick={this.deleteCardFromList} role="button"></span>
                {!showForm
                ? <div className="cardData">
                    <div className="clearfix">
                        <span className="fa fa-pencil pull-right"
                            onClick={this.showForm} role="button"></span>
                    </div>
                    <div className="row">
                        <div className="userName col-md-6">
                            <div><b>Username</b></div>
                            {card.username}
                        </div>
                        <div className="status col-md-6">
                            <div><b>Status</b></div>
                            {card.status}
                        </div>
                    </div>
                    <div className="description">
                        <div><b>description</b></div>
                        {card.description}
                    </div>
                </div>
                : <div className="editForm">
                    <CardForm hideForm={this.hideForm} formSubmit={this.formSubmit}
                        defaultUserName={card.username} defaultStatus={card.status}
                        defaultDescription={card.description} />
                </div>}
                {showMoveCard
                ? <div className="row">
                    <div className="col-md-offset-1"><b>choose List</b></div>
                    <form onSubmit={this.moveToList}>
                        <div className="form-group col-md-8">
                            <select name="newList" className="form-control">
                                {headings.map((heading, i) => {
                                    if (heading !== listHeading) {
                                        return <option key={i} value={heading}>{heading}</option>
                                    } else {
                                        return null
                                    }
                                })}
                            </select>
                        </div>
                        <span className="input-group-btn">
                            <button className="btn btn-sm btn-primary" type="submit" >
                                <i className="fa fa-check"></i>
                            </button>
                            <button className="btn btn-sm btn-default" onClick={this.hideMoveCard}>
                                <i className="fa fa-close"></i>
                            </button>
                        </span>
                    </form>
                </div>
                : <button onClick={this.showMoveCard} className="btn btn-sm btn-info">Move this card</button>}

            </div>
        )
    }
}
