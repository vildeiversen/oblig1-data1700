package com.example.oblig3data1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {
    private final JdbcTemplate db;

    @Autowired
    public BillettRepository(JdbcTemplate db) {
        this.db = db;
    }

    public void kjopBillett(Billett innBillett){
        String sql = "INSERT INTO Billett (film, antallBilletter, fornavn, etternavn, epost) VALUES(?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(), innBillett.getAntallBilletter(), innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getEpost());
    }

    public List<Billett> hentAlleBilletter(){
        String sql = "SELECT * FROM Billett";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        return alleBilletter;
    }

    public void slettAlleBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
