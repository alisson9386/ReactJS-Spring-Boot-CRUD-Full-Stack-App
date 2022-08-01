import React, { Component } from 'react'
import UsuarioService from '../services/UsuarioService';
import Swal from "sweetalert2";

const Toast = Swal.mixin({
			  toast: true,
			  position: 'top-end',
			  showConfirmButton: false,
			  timer: 3000,
			  timerProgressBar: true,
			});

class CompontenteCriarUsuario extends Component {
	
	showAlertAdicionar = () => {
        Toast.fire({
						  icon: 'success',
						  title: 'Usuario adicionado com sucesso!'
						})	
    }
    
    showAlertAtualizar = () => {
        Toast.fire({
						  icon: 'success',
						  title: 'Usuario atualizado com sucesso!'
						})	
    }
    
    showAlertFaltaNome = () => {
        Toast.fire({
						  icon: 'warning',
						  title: 'Informe o nome!'
						})
						return;	
    }
    
    
	showAlertFaltaIdade = () => {
        Toast.fire({
						  icon: 'warning',
						  title: 'Informe a idade!'
						})
						return;	
    }
    
    showAlertFaltaSkill = () => {
        Toast.fire({
						  icon: 'warning',
						  title: 'Informe a skill!'
						})
						return;	
    }
    
    
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
        this.salvarOuAtualizarUsuario = this.salvarOuAtualizarUsuario.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            UsuarioService.buscaUsuarioPorId(this.state.id).then( (res) =>{
                let usuario = res.data;
                this.setState({nome: usuario.nome,
                    idade: usuario.idade,
                    skill : usuario.skill
                });
            });
        }        
    }
    salvarOuAtualizarUsuario = (e) => {
        e.preventDefault();
        let usuario = {nome: this.state.nome, idade: this.state.idade, skill: this.state.skill};
        console.log('usuario => ' + JSON.stringify(usuario));
        
        if(this.state.nome == null || this.state.nome == ''){
			this.showAlertFaltaNome();
			return;
		}
		
		if(this.state.idade == null || this.state.idade == ''){
			this.showAlertFaltaIdade();
			return;
		}
		
		if(this.state.skill == null || this.state.skill == ''){
			this.showAlertFaltaSkill();
			return;
		}

        if(this.state.id === '_add'){
            UsuarioService.criarUsuario(usuario).then(res =>{
                this.props.history.push('/usuarios');
            });
            this.showAlertAdicionar();
        }else{
            UsuarioService.atualizarUsuario(usuario, this.state.id).then( res => {
                this.props.history.push('/usuarios');
            });
            this.showAlertAtualizar();
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Adicionar Desenvolvedor</h3>
        }else{
            return <h3 className="text-center">Atualizar Desenvolvedor</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nome: </label>
                                            <input placeholder="Nome" name="nome" className="form-control" 
                                                value={this.state.nome} onChange={this.changeNomeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Idade </label>
                                            <input placeholder="Idade" type="number" name="idade" className="form-control" 
                                                value={this.state.idade} onChange={this.changeIdadeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Skill </label>
                                                <select class="form-control" aria-label="Default select example" 
                                                value={this.state.skill} onChange={this.changeSkillHandler} placeholder="Skill" name="skill">
												  <option selected>Selecione</option>
												  <option value="Phyton">Phyton</option>
												  <option value="Java">Java</option>
												  <option value="React">React</option>
												  <option value="Angular">Angular</option>
												  <option value="Javascript">Javascript</option>
												</select>
                                        </div>

                                        <button className="btn btn-success" onClick={this.salvarOuAtualizarUsuario}>Salvar</button>
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

export default CompontenteCriarUsuario
