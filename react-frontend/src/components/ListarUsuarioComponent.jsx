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
			
			


class ListarUsuarioComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			usuarios: []
		}
		this.addUsuario = this.addUsuario.bind(this);
		this.editarUsuario = this.editarUsuario.bind(this);
		this.deletarUsuario = this.deletarUsuario.bind(this);
	}

	deletarUsuario(id) {
		Swal.fire({
			title: 'Deseja realmente excluir?',
			showDenyButton: true,
			confirmButtonText: 'Excluir',
			denyButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				UsuarioService.deletarUsuario(id).then(res => {
					this.setState({ usuarios: this.state.usuarios.filter(usuario => usuario.id !== id) });
				});
				Toast.fire({
					icon: 'success',
					title: 'Usuario deletado com sucesso!'
				})

			}
			 else if(result.isDenied) {
		Toast.fire({
			icon: 'error',
			title: 'Exclusao cancelada!'
		})
	}
})
    }
    
    
visualizarUsuario(id){
	this.props.history.push(`/view-usuarios/${id}`);
}
editarUsuario(id){
	this.props.history.push(`/add-usuarios/${id}`);
}

componentDidMount(){
	UsuarioService.listaTodos().then((res) => {
		this.setState({ usuarios: res.data });
	});
}

addUsuario(){
	this.props.history.push('/add-usuarios/_add');
}

render() {
	return (
		<div>
			<h2 className="text-center">Lista de Devs</h2>
			<div className="row">
				<button className="btn btn-primary" onClick={this.addUsuario}> Adicionar Desenvolvedor</button>
			</div>
			<br></br>
			<div className="row">
				<table className="table table-striped table-bordered">

					<thead>
						<tr>
							<th> Nome </th>
							<th> Idade </th>
							<th> Skill </th>
							<th> Ações</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.usuarios.map(
								usuario =>
									<tr key={usuario.id}>
										<td> {usuario.nome} </td>
										<td> {usuario.idade}</td>
										<td> {usuario.skill}</td>
										<td>
											<button onClick={() => this.editarUsuario(usuario.id)} className="btn btn-warning">Editar </button>
											<button style={{ marginLeft: "10px" }} onClick={() => this.deletarUsuario(usuario.id)} className="btn btn-danger">Excluir  </button>
										</td>
									</tr>
							)
						}
					</tbody>
				</table>
			</div>

		</div>
	)
}
}

export default ListarUsuarioComponent
