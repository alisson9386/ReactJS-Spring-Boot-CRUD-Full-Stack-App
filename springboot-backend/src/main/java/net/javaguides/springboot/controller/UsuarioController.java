package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Usuario;
import net.javaguides.springboot.repository.UsuarioRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@GetMapping("/usuarios")
	public List<Usuario> listaTodos(){
		return usuarioRepository.findAll();
	}		
	
	@PostMapping("/usuarios")
	public Usuario criarUsuario(@RequestBody Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	
	@GetMapping("/usuarios/{id}")
	public ResponseEntity<Usuario> buscaUsuarioPorId(@PathVariable Long id) {
		Usuario usuario = usuarioRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Não existe usuario com o id :" + id));
		return ResponseEntity.ok(usuario);
	}
	
	@PutMapping("/usuarios/{id}")
	public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetalhes){
		Usuario usuario = usuarioRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Não existe usuario com o id :" + id));
		
		usuario.setNome(usuarioDetalhes.getNome());
		usuario.setIdade(usuarioDetalhes.getIdade());
		usuario.setSkill(usuarioDetalhes.getSkill());
		
		Usuario atualizarUsuario = usuarioRepository.save(usuario);
		return ResponseEntity.ok(atualizarUsuario);
	}
	
	@DeleteMapping("/usuarios/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarUsuario(@PathVariable Long id){
		Usuario usuario = usuarioRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Não existe usuario com o id :" + id));
		
		usuarioRepository.delete(usuario);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
