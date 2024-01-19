package com.zirtoshka.pupa.shot;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShotRepository extends JpaRepository<Shot,Integer> {
    List<Shot> findAllByOwnername(String name);
    List<Shot> findAllByOwnernameAndR(String name, Double r);

    void deleteShotsByOwnername(String name);
}

