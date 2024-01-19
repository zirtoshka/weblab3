package com.zirtoshka.pupa.shot;

public class AreaChecker {
    public static boolean checkIsKill(Double x, Double y, Double r) {
        return checkSquare(x, y, r) || checkSector(x, y, r) || checkTriangle(x, y, r);
    }

    private static boolean checkSquare(Double x, Double y, Double r) {
        return (x <= 0 && x >= -r / 2) && (y >= 0 && y <= r);
    }

    private static boolean checkTriangle(Double x, Double y, Double r) {
        return (x <= 0 && x >= -r / 2) &&
                (y <= 0 && y >= -r) &&
                (y >= -2 * x - r);
    }

    private static boolean checkSector(Double x, Double y, Double r) {
        return (x >= 0) &&
                (y >= 0) &&
                (x * x + y * y <= r * r / 4);

    }


}
