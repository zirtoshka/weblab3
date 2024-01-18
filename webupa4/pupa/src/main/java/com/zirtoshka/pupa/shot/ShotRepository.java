package com.zirtoshka.pupa.shot;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShotRepository extends JpaRepository<Shot,Integer> {
    Optional<Shot> findByOwnername(String name);
}
