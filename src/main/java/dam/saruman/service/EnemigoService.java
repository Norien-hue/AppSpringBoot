package dam.saruman.service;

import dam.saruman.entity.Enemigo;
import dam.saruman.repository.EnemigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnemigoService {
    @Autowired
    private EnemigoRepository enemigoRepository;

    public List<Enemigo> obtenerTodos(){
        List<Enemigo> enemigos = enemigoRepository.findAll();
        if(enemigos.isEmpty()){
            System.out.println("Achio ");
        }else {
            System.out.println("Jefe esto va como una máquina");
            enemigos.forEach(enemigo -> {
                System.out.println("ID"+enemigo.getId());
            });
        }
        return enemigos;
    }

    public Optional<Enemigo> obtenerPorId(Long id) {
        return enemigoRepository.findById(id);
    }

    public Enemigo guardar(Enemigo enemigo){
        return enemigoRepository.save(enemigo);
    }

    public void eliminar(Long id) {
        enemigoRepository.deleteById(id);
    }

    public Enemigo actualizar(Long id, Enemigo enemigoActualizado) {
        return enemigoRepository.findById(id)
                .map(enemigo -> {
                    if (enemigoActualizado.getNombre() != null) {
                        enemigo.setNombre(enemigoActualizado.getNombre());
                    }
                    if (enemigoActualizado.getPais() != null) {
                        enemigo.setPais(enemigoActualizado.getPais());
                    }
                    if (enemigoActualizado.getAfiliacion() != null) {
                        enemigo.setAfiliacion(enemigoActualizado.getAfiliacion());
                    }
                    return enemigoRepository.save(enemigo);
                })
                .orElseThrow(() -> new RuntimeException("Enemigo no encontrado con id: " + id));
    }
}