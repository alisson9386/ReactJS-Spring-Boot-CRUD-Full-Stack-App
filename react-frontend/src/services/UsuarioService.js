import axios from 'axios';

const USUARIO_API_BASE_URL = "http://localhost:8080/api/v1/usuarios";

class UsuarioService {

    listaTodos(){
        return axios.get(USUARIO_API_BASE_URL);
    }

    criarUsuario(usuario){
        return axios.post(USUARIO_API_BASE_URL, usuario);
    }

    buscaUsuarioPorId(usuarioId){
        return axios.get(USUARIO_API_BASE_URL + '/' + usuarioId);
    }

    atualizarUsuario(usuario, usuarioId){
        return axios.put(USUARIO_API_BASE_URL + '/' + usuarioId, usuario);
    }

    deletarUsuario(usuarioId){
        return axios.delete(USUARIO_API_BASE_URL + '/' + usuarioId);
    }
}

export default new UsuarioService()