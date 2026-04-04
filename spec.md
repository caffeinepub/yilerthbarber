# YilerthBarber

## Current State
La calculadora BCV permite convertir USD a Bolívares y viceversa. La tasa en el backend está en 36.5, que está muy desactualizada. La calculadora en el frontend muestra "Tasa actual: 1 USD = X Bs."

## Requested Changes (Diff)

### Add
- Nada nuevo

### Modify
- Actualizar la tasa BCV en el backend de 36.5 a 473.92 (tasa actual del Banco de Venezuela informada por el usuario)
- Actualizar la etiqueta de la calculadora para que diga "Tasa Banco de Venezuela" en lugar de solo "BCV"
- Actualizar el texto de la nota al pie de la calculadora para reflejar "Tasa del Banco de Venezuela"

### Remove
- Nada

## Implementation Plan
1. Actualizar `var bcvRate : Float = 36.5;` a `var bcvRate : Float = 473.92;` en main.mo
2. Actualizar los textos de la calculadora en App.tsx para reflejar "Banco de Venezuela"
