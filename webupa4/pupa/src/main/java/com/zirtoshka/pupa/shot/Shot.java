package com.zirtoshka.pupa.shot;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "_shot")
public class Shot {
    @JsonIgnore
    @Id
    @GeneratedValue
    private Integer id;
    private Double x;
    private Double y;
    private Double r;
    private String createTime;
    @JsonIgnore
    private String ownername;
    private boolean isKill;
}
