package dam.saruman.repository;

import dam.saruman.entity.Enemigo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnemigoRepository extends MongoRepository<Enemigo, String> {

    List<Enemigo> findByNombre(String nombre);
    
    List<Enemigo> findByPais(String pais);
    
    List<Enemigo> findByAfiliacion(String afiliacion);
}