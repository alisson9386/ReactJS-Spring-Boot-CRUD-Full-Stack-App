import React, { Component } from 'react'
import UsuarioService from '../services/UsuarioService';

class AtualizarUsuarioComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nome: '',
            idade: '',
            skill: ''
        }
        this.changeNomeHandler = this.changeNomeHandler.bind(this);
        this.changeIdadeHandler = this.changeIdadeHandler.bind(this);
        this.atualizarUsuario = this.atualizarUsuario.bind(this);
    }

    componentDidMount(){
        UsuarioService.buscaUsuarioPorId(this.state.id).then( (res) =>{
            let usuario = res.data;
            this.setState({nome: usuario.nome,
                idade: usuario.idade,
                skill : usuario.skill
            });
        });
    }

    atualizarUsuario = (e) => {
        e.preventDefault();
        let usuario = {nome: this.state.nome, idade: this.state.idade, skill: this.state.skill};
        console.log('usuario => ' + JSON.stringify(usuario));
        console.log('id => ' + JSON.stringify(this.state.id));
        UsuarioService.atualizarUsuario(usuario, this.state.id).then( res => {
            this.props.history.push('/usuarios');
        });
    }
    
    changeNomeHandler= (event) => {
        this.setState({nome: event.target.value});
    }

    changeIdadeHandler= (event) => {
        this.setState({idade: event.target.value});
    }

    changeSkillHandler= (event) => {
        this.setState({skill: event.target.value});
    }

    cancel(){
        this.props.history.push('/usuarios');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Atualizar Usuario</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nome: </label>
                                            <input placeholder="Nome" name="nome" className="form-control" 
                                                value={this.state.nome} onChange={this.changeNomeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Idade: </label>
                                            <input placeholder="Idade" name="idade" className="form-control" 
                                                value={this.state.idade} onChange={this.changeIdadeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Skill: </label>
                                            <input placeholder="Skill" name="skill" className="form-control" 
                                                value={this.state.skillemailId} onChange={this.changeSkillHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.atualizarUsuario}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default AtualizarUsuarioComponent
