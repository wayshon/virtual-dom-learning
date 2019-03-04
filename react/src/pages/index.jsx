import React, { Component } from 'react';

class Cell extends Component {
    render() {
        return (
            <div>
                <span>{this.props.name}</span>
                <input type="text"/>
            </div>
        )
    }
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                id: 1,
                name: 'one'
            }, {
                id: 2,
                name: 'two'
            }, {
                id: 3,
                name: 'three'
            }]
        }
    }

    unshift() {
        let { list } = this.state;
        list.unshift({
            id: 0,
            name: 'zero'
        })
        this.setState({ list })
    }

    shift() {
        let { list } = this.state;
        list.shift()
        this.setState({ list })
    }

    push() {
        let { list } = this.state;
        list.push({
            id: 4,
            name: 'four'
        })
        this.setState({ list })
    }

    pop() {
        let { list } = this.state;
        list.pop()
        this.setState({ list })
    }

    render() {
        return (
            <div className="wrapper">
                <div>welcome learning virtual-dom</div>
                <button onClick={this.unshift.bind(this)}>unshift</button>
                <br/>
                <button onClick={this.shift.bind(this)}>shift</button>
                <br/>
                <button onClick={this.push.bind(this)}>push</button>
                <br/>
                <button onClick={this.pop.bind(this)}>pop</button>
                <div style={{marginTop: '30px'}}>
                    {
                        this.state.list.map(v => (<Cell name={v.name} key={v.id} />))
                    }
                </div>
            </div>
        )
    }
}

export default Index;