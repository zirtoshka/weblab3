package com.zirtoshka.pupa.shot;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_shot")
public class Shot {
    @Id
    @GeneratedValue
    private Integer id;
    private Double x;
    private Double y;
    private Double r;
    private String createTime;
    private String ownername;
}
