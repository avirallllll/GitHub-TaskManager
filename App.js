import React, { Component } from "react"
import "./App.css"
import swal from "sweetalert"
import ListForm from "./ListForm"
import ListView from "./ListView"

class App extends Component {
    constructor (props) {
        super(props)
        this.initialState = {
            listOrder: [],
            lists:{
            }
        }
        if (localStorage.getItem("state")) {
            let x = JSON.parse(localStorage.getItem("state"))
            // console.log(x)
            this.state = { ...x }
        } else {
            this.state = {
                ...this.initialState
            }
        }
    }
    // componentWillMount () {
    //     this.setState({
    //         ...this.initialState
    //     })
    // }
    componentWillUpdate () {
        // console.log("g")
        localStorage.setItem("state", JSON.stringify(this.state))
    }
    editName = (presentHeading, newHeading) => {
        if (newHeading === presentHeading) {
            return true
        }
        if (!this.canAdd(newHeading)) {
            swal({
                type: "error",
                title: `already a list with name ${newHeading}`
            })
            return false
        }
        let { listOrder, lists } = this.state
        presentHeading = presentHeading.trim()
        newHeading = newHeading.trim()
        let indexToChange
        listOrder.map((heading, i) => {
            if (heading === presentHeading) {
                indexToChange = i
            }
        })
        listOrder[indexToChange] = newHeading
        lists[newHeading] = lists[presentHeading]
        delete lists[presentHeading]
        this.setState({
            listOrder: listOrder,
            lists: lists
        })
        return true
    }
    canAdd = (title) => {
        
        let { lists } = this.state
        title = title.trim()
        if (lists[title] !== undefined) {
            return false
        }
        return true
    }
    addList = (title) => {
        title = title.trim()
        let { lists, listOrder } = this.state
        lists[title] = []
        listOrder.push(title)
        this.setState({
            listOrder: listOrder,
            lists: lists
        })
        // console.log(this.state)
        return true
    }
    addCard = (heading, cardData) => {
        let { lists } = this.state
        lists[heading].push(cardData)
        this.setState({
            lists: lists
        })
    }
    deleteList = (listHeading) => {
        let { lists, listOrder } = this.state
        delete lists[listHeading]
        let toRemoveIndex
        listOrder.map((heading, i) => {
            if (heading === listHeading) {
                toRemoveIndex = i
            }
        })
        listOrder.splice(toRemoveIndex, 1)
        this.setState({
            listOrder: listOrder,
            lists: lists
        })
    }
    deleteCard = (heading, index) => {
        let { lists } = this.state
        lists[heading].splice(index, 1)
        this.setState({
            lists: lists
        })
    }
    editCard = (listHeading, newCardOject, index) => {
        // console.log(listHeading, newCardOject, index)
        let { lists } = this.state
        lists[listHeading][index] = newCardOject
        this.setState({
            lists: lists
        })
    }
    transferToList = (listHeading, index, toList) => {
        let { lists } = this.state
        let cardObject = lists[listHeading][index]
        lists[listHeading].splice(index, 1)
        lists[toList].push(cardObject)
        this.setState({
            lists: lists
        })
    }
    render () {
        let { lists, listOrder } = this.state
        let listsView = []
        for (let i = 0; i < listOrder.length; i += 3) {
            let heading = listOrder[i]
            let heading1 = (i + 1 < listOrder.length ? listOrder[i + 1] : null)
            let heading2 = (i + 2 < listOrder.length ? listOrder[i + 2] : null)
            let jsx = (
                <div className="row" key={i}>
                    <ListView key={heading} cards={lists[heading]} selfHeading={heading} headings={listOrder}
                        addCard={this.addCard} deleteCard={this.deleteCard}
                        deleteList={this.deleteList} editName={this.editName}
                        editCard={this.editCard} transferToList={this.transferToList} />
                    {i + 1 < listOrder.length
                    ? <ListView key={heading1} cards={lists[heading1]} selfHeading={heading1} headings={listOrder}
                        addCard={this.addCard}
                        deleteCard={this.deleteCard} deleteList={this.deleteList} editName={this.editName}
                        editCard={this.editCard} transferToList={this.transferToList} />
                    : null}
                    {i + 2 < listOrder.length
                    ? <ListView key={heading2} cards={lists[heading2]} selfHeading={heading2} headings={listOrder}
                        addCard={this.addCard} deleteCard={this.deleteCard}
                        deleteList={this.deleteList} editName={this.editName}
                        editCard={this.editCard} transferToList={this.transferToList} />
                    : null}
                </div>
            )
            listsView.push(jsx)
        }
        return (
            <div>
                <div className="listForm clearfix">
                    <div className="col-md-offset-1 col-md-3">
                        <ListForm addList={this.addList} canAdd={this.canAdd} />
                    </div>
                </div>
                <div className="lists">
                    {/* {listOrder.map((heading, i) => (
                        <ListView key={heading} cards={lists[heading]} selfHeading={heading} headings={listOrder}
                            addCard={this.addCard}
                            deleteCard={this.deleteCard} deleteList={this.deleteList} editName={this.editName}
                            editCard={this.editCard} transferToList={this.transferToList} />
                    ))} */ }
                    {listsView}
                </div>
            </div>
        )
    }
}

export default App
