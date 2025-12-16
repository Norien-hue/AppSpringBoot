package dam.saruman.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "EnemigosMongo")
public class Enemigo {

    @Id
    private String id;

    @Field("nombre")
    private String nombre;

    @Field("origen")
    private String pais;

    @Field("afiliacion")
    private String afiliacion;

    public Enemigo() {
    }

    public Enemigo(String id, String nombre, String pais, String afiliacion){
        this.id = id;
        this.nombre = nombre;
        this.pais = pais;
        this.afiliacion = afiliacion;
    }

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getAfiliacion() {
        return afiliacion;
    }

    public void setAfiliacion(String afiliacion) {
        this.afiliacion = afiliacion;
    }
}