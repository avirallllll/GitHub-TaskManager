import React, { Component } from "react"
import "./App.css"
import $ from "jquery"
import Card from "./Card"
import AddCard from "./AddCard"

export default class ListView extends Component {
    static propTypes = {
        editName: React.PropTypes.func,
        selfHeading: React.PropTypes.string,
        deleteList: React.PropTypes.func,
        cards: React.PropTypes.array,
        headings: React.PropTypes.array,
        addCard: React.PropTypes.func,
        deleteCard: React.PropTypes.func,
        editCard: React.PropTypes.func,
        transferToList: React.PropTypes.func
    }
    constructor (props) {
        super(props)
        this.state = {
            showHeadingForm: false
        }
    }
    formSubmit = (e) => {
        const { editName, selfHeading } = this.props
        e.preventDefault()
        let data = $(e.target).serializeArray()
        let newHeading = data[0].value.trim()
        let close = editName(selfHeading, newHeading)
        if (close) {
            this.closeHeadingForm()
        }
    }
    deleteThisList = () => {
        const { deleteList, selfHeading } = this.props
        deleteList(selfHeading)
    }
    showHeadingForm = () => {
        this.setState({
            showHeadingForm: true
        })
    }
    closeHeadingForm = () => {
        this.setState({
            showHeadingForm: false
        })
    }
    render () {
        let { cards, selfHeading, headings, deleteCard, addCard, editCard, transferToList } = this.props
        let { showHeadingForm } = this.state
        return (
            <div className="col-md-3 oneList">
                <span className="fa fa-close pull-right" role="button" onClick={this.deleteThisList}></span>
                {showHeadingForm
                ? <form onSubmit={this.formSubmit}>
                    <div className="form-group col-md-8">
                        <input type="text" className="form-control" defaultValue={selfHeading}
                            placeholder="add Heading for this list" name="newHeading" required />
                    </div>
                    <span className="input-group-btn">
                        <button className="btn btn-sm btn-primary" type="submit" >
                            <i className="fa fa-check"></i>
                        </button>
                        <button className="btn btn-sm btn-default" onClick={this.closeHeadingForm}>
                            <i className="fa fa-close"></i>
                        </button>
                    </span>
                </form>
                : <div className="listHeading">
                    <b>{selfHeading}</b>
                    {" "}<a href="#" onClick={this.showHeadingForm}><i className="fa fa-pencil"></i></a>
                </div>}
                {cards.map((card, i) => {
                    return (<div key={i}>
                        <Card card={card} listHeading={selfHeading} deleteCard={deleteCard} index={i}
                            editCard={editCard} headings={headings} transferToList={transferToList} />
                    </div>)
                })}
                <AddCard selfHeading={selfHeading} addCard={addCard} />
            </div>
        )
    }
}
