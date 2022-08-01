package net.javaguides.springboot.controller;

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

import net.javaguides.springboot.model.Usuario;
import net.javaguides.springboot.service.UsuarioService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("/usuarios")
	public List<Usuario> listaTodos(){
		return usuarioService.listaTodos();
	}		
	
	@PostMapping("/usuarios")
	public Usuario criarUsuario(@RequestBody Usuario usuario) {
		usuarioService.criarUsuario(usuario);
		return usuarioService.criarUsuario(usuario);
	}
	
	@GetMapping("/usuarios/{id}")
	public ResponseEntity<Usuario> buscaUsuarioPorId(@PathVariable Long id) {
		return usuarioService.buscaUsuarioPorId(id);
	}
	
	@PutMapping("/usuarios/{id}")
	public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetalhes){
		return usuarioService.atualizarUsuario(id, usuarioDetalhes);
	}
	
	@DeleteMapping("/usuarios/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarUsuario(@PathVariable Long id){
		return usuarioService.deletarUsuario(id);
	}
	
}
