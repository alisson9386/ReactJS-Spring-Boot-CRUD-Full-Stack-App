import React, { Component } from 'react'
import UsuarioService from '../services/UsuarioService'

class VisualizarUsuarioComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            usuario: {}
        }
    }

    componentDidMount(){
        UsuarioService.buscaUsuarioPorId(this.state.id).then( res => {
            this.setState({usuario: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Visualizar Dev</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Nome : </label>
                            <div> { this.state.usuario.nome }</div>
                        </div>
                        <div className = "row">
                            <label> Idade: </label>
                            <div> { this.state.usuario.idade }</div>
                        </div>
                        <div className = "row">
                            <label> Skill: </label>
                            <div> { this.state.usuario.skill }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default VisualizarUsuarioComponent
