package com.zirtoshka.pupa.shot;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class Coordinates {
    @NotNull(message = "x must not be null")
    @DecimalMin(value = "-5", message = "x must be greater than or equal to -5")
    @DecimalMax(value = "5", message = "x must be less than or equal to 5")
    private Double x;

    @NotNull(message = "y must not be null")
    @DecimalMin(value = "-5", message = "y must be greater than or equal to -5")
    @DecimalMax(value = "5", message = "y must be less than or equal to 5")
    private Double y;

    @NotNull(message = "r must not be null")
    @DecimalMin(value = "0.0", message = "r must be greater than or equal to 0.0")
    private Double r;
}
