package net.javaguides.springboot.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Usuario;
import net.javaguides.springboot.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	public List<Usuario> listaTodos(){
		List<Usuario> users = usuarioRepository.findAll();
		return users;
	}
	
	public Usuario criarUsuario(@RequestBody Usuario usuario) {
		Usuario user = usuarioRepository.save(usuario);
		return user;
	}
	
	public ResponseEntity<Usuario> buscaUsuarioPorId(@PathVariable Long id) {
		Usuario usuario = usuarioRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Não existe usuario com o id :" + id));
		return ResponseEntity.ok(usuario);
	}
	
	public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetalhes){
		Usuario usuario = usuarioRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Não existe usuario com o id :" + id));
		
		usuario.setNome(usuarioDetalhes.getNome());
		usuario.setIdade(usuarioDetalhes.getIdade());
		usuario.setSkill(usuarioDetalhes.getSkill());
		
		Usuario atualizarUsuario = usuarioRepository.save(usuario);
		return ResponseEntity.ok(atualizarUsuario);
	}
	
	public ResponseEntity<Map<String, Boolean>> deletarUsuario(@PathVariable Long id){
		Usuario usuario = usuarioRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Não existe usuario com o id :" + id));
		
		usuarioRepository.delete(usuario);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
