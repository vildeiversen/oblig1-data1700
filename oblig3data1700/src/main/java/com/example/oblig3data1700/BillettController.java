package com.example.oblig3data1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository billettRepository;

    @PostMapping("/kjop")
    public void kjopBillett(Billett innBillett) {
        billettRepository.kjopBillett(innBillett);
    }

    @GetMapping("/alle")
    public List<Billett> hentAlleBilletter() {
        return billettRepository.hentAlleBilletter();
    }

    @GetMapping("/slettAlle")
    public void slettAlleBilletter() {
        billettRepository.slettAlleBilletter();
    }
}
