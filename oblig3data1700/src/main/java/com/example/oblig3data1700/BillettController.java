package com.example.oblig3data1700;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/billetter")
public class BillettController {

    private final List<Billett> billettListe = new ArrayList<>();

    @PostMapping("/kjop")
    public Billett kjopBillett(@RequestBody Billett billett) {
        billettListe.add(billett);
        return billett;
    }

    @GetMapping("/alle")
    public List<Billett> hentAlleBilletter() {
        return billettListe;
    }

    @DeleteMapping("/slett")
    public void slettAlleBilletter() {
        billettListe.clear();
    }
}
